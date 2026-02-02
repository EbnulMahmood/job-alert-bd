import { useState } from 'react'
import { Bell, BellOff, Mail, Loader2 } from 'lucide-react'
import useNotifications from '../hooks/useNotifications'

function NotificationSettings() {
  const {
    isSupported,
    isSubscribed,
    permission,
    loading,
    error,
    subscribe,
    unsubscribe,
  } = useNotifications()

  const [email, setEmail] = useState('')
  const [keywords, setKeywords] = useState('.NET, C#, Backend')
  const [showForm, setShowForm] = useState(false)

  const handleSubscribe = async () => {
    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean)
    const success = await subscribe(email || undefined, [], keywordList)
    if (success) {
      setShowForm(false)
    }
  }

  if (!isSupported) {
    return (
      <div className="card bg-yellow-50 border-yellow-200">
        <div className="flex items-center gap-3">
          <BellOff className="w-6 h-6 text-yellow-600" />
          <div>
            <h3 className="font-medium text-yellow-900">Push Notifications Not Supported</h3>
            <p className="text-sm text-yellow-700">
              Your browser doesn't support push notifications. Try using Chrome or Firefox.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isSubscribed) {
    return (
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Notifications Enabled</h3>
              <p className="text-sm text-gray-500">
                You'll receive alerts for new opportunities
              </p>
            </div>
          </div>
          <button
            onClick={unsubscribe}
            disabled={loading}
            className="btn-secondary flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <BellOff className="w-4 h-4" />}
            Disable
          </button>
        </div>
      </div>
    )
  }

  if (showForm) {
    return (
      <div className="card">
        <h3 className="font-semibold text-gray-900 mb-4">Set Up Alerts</h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email (optional)
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Get daily email digests in addition to push notifications
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Keywords to Track
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder=".NET, C#, Backend, Senior"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <p className="mt-1 text-xs text-gray-500">
              Comma-separated keywords to filter opportunities
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Bell className="w-4 h-4" />
              )}
              Enable Notifications
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <BellOff className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Get Alerts</h3>
            <p className="text-sm text-gray-500">
              Never miss a new opportunity
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Bell className="w-4 h-4" />
          Enable
        </button>
      </div>

      {permission === 'denied' && (
        <div className="mt-3 p-3 bg-yellow-50 text-yellow-800 rounded-lg text-sm">
          Notifications are blocked. Please enable them in your browser settings.
        </div>
      )}
    </div>
  )
}

export default NotificationSettings
