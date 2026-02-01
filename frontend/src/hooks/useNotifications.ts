import { useState, useEffect, useCallback } from 'react'
import { notificationApi, subscriptionApi } from '../services/api'

interface PushSubscription {
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

  useEffect(() => {
    // Check if push notifications are supported
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
      const subscription = await registration.pushManager.getSubscription()
      setIsSubscribed(!!subscription)
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
    } catch (err) {
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
      // Request permission if not granted
      if (permission !== 'granted') {
        const granted = await requestPermission()
        if (!granted) {
          setError('Notification permission denied')
          setLoading(false)
          return false
        }
      }

      // Get VAPID public key
      const vapidPublicKey = await notificationApi.getVapidPublicKey()

      // Convert VAPID key to Uint8Array
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey)

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready

      // Subscribe to push
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey as BufferSource,
      })

      // Extract subscription data
      const p256dhKey = pushSubscription.getKey('p256dh')
      const authKey = pushSubscription.getKey('auth')
      if (!p256dhKey || !authKey) {
        throw new Error('Failed to get push subscription keys')
      }

      const subscriptionData: PushSubscription = {
        endpoint: pushSubscription.endpoint,
        keys: {
          p256dh: arrayBufferToBase64(p256dhKey),
          auth: arrayBufferToBase64(authKey),
        },
      }

      // Save subscription to backend
      await subscriptionApi.create({
        email,
        push_endpoint: subscriptionData.endpoint,
        push_keys: subscriptionData.keys,
        companies: companies || [],
        keywords: keywords || [],
      })

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
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        await subscription.unsubscribe()
      }

      setIsSubscribed(false)
      setLoading(false)
      return true
    } catch (err) {
      console.error('Unsubscribe error:', err)
      setError('Failed to unsubscribe')
      setLoading(false)
      return false
    }
  }, [])

  return {
    isSupported,
    isSubscribed,
    permission,
    loading,
    error,
    requestPermission,
    subscribe,
    unsubscribe,
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
