import { useState, useEffect, useCallback } from 'react'
import { notificationApi, subscriptionApi, Subscription } from '../services/api'

interface PushSubscriptionData {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export function useNotifications() {
  const [isSupported, setIsSupported] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window
    setIsSupported(supported)

    if (supported) {
      setPermission(Notification.permission)
      checkSubscription()
    }
  }, [])

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const pushSub = await registration.pushManager.getSubscription()
      setIsSubscribed(!!pushSub)

      // If push subscription exists, look up backend subscription to get preferences
      if (pushSub) {
        const backendSub = await subscriptionApi.lookupByEndpoint(pushSub.endpoint)
        if (backendSub) {
          setSubscription(backendSub)
        }
      }
    } catch (err) {
      console.error('Error checking subscription:', err)
    }
  }

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('Push notifications are not supported in this browser')
      return false
    }

    try {
      const result = await Notification.requestPermission()
      setPermission(result)
      return result === 'granted'
    } catch {
      setError('Failed to request notification permission')
      return false
    }
  }, [isSupported])

  const subscribe = useCallback(async (
    email?: string,
    companies?: string[],
    keywords?: string[]
  ): Promise<boolean> => {
    if (!isSupported) {
      setError('Push notifications are not supported')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      if (permission !== 'granted') {
        const granted = await requestPermission()
        if (!granted) {
          setError('Notification permission denied')
          setLoading(false)
          return false
        }
      }

      const vapidPublicKey = await notificationApi.getVapidPublicKey()
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey)
      const registration = await navigator.serviceWorker.ready

      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey as BufferSource,
      })

      const p256dhKey = pushSubscription.getKey('p256dh')
      const authKey = pushSubscription.getKey('auth')
      if (!p256dhKey || !authKey) {
        throw new Error('Failed to get push subscription keys')
      }

      const subscriptionData: PushSubscriptionData = {
        endpoint: pushSubscription.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(p256dhKey),
          auth: arrayBufferToBase64(authKey),
        },
      }

      const backendSub = await subscriptionApi.create({
        email,
        push_endpoint: subscriptionData.endpoint,
        push_keys: subscriptionData.keys,
        companies: companies || [],
        keywords: keywords || [],
      })

      setSubscription(backendSub)
      setIsSubscribed(true)
      setLoading(false)
      return true
    } catch (err) {
      console.error('Subscription error:', err)
      setError('Failed to subscribe to notifications')
      setLoading(false)
      return false
    }
  }, [isSupported, permission, requestPermission])

  const unsubscribe = useCallback(async (): Promise<boolean> => {
    setLoading(true)
    setError(null)

    try {
      const registration = await navigator.serviceWorker.ready
      const pushSub = await registration.pushManager.getSubscription()

      if (pushSub) {
        await pushSub.unsubscribe()
      }

      // Deactivate on backend too
      if (subscription?.id) {
        try {
          await subscriptionApi.delete(subscription.id)
        } catch {
          // Ignore if already deleted
        }
      }

      setIsSubscribed(false)
      setSubscription(null)
      setLoading(false)
      return true
    } catch (err) {
      console.error('Unsubscribe error:', err)
      setError('Failed to unsubscribe')
      setLoading(false)
      return false
    }
  }, [subscription])

  const updatePreferences = useCallback(async (
    companies: string[],
    keywords: string[],
    email?: string,
  ): Promise<boolean> => {
    if (!subscription?.id) {
      setError('No active subscription to update')
      return false
    }

    setLoading(true)
    setError(null)

    try {
      const updated = await subscriptionApi.update(subscription.id, {
        companies,
        keywords,
        ...(email !== undefined ? { email } : {}),
      })
      setSubscription(updated)
      setLoading(false)
      return true
    } catch (err) {
      console.error('Update preferences error:', err)
      setError('Failed to update preferences')
      setLoading(false)
      return false
    }
  }, [subscription])

  return {
    isSupported,
    isSubscribed,
    permission,
    loading,
    error,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
    updatePreferences,
  }
}

// Utility functions
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export default useNotifications
