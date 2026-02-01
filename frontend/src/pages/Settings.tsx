import { useState } from 'react'
import { Bell, Mail, Building2, Tag, Save, Check } from 'lucide-react'
import NotificationSettings from '../components/NotificationSettings'

const COMPANIES = [
  'Cefalo', 'Kaz Software', 'SELISE', 'Enosis Solutions', 'BJIT',
  'Samsung R&D', 'Therap BD', 'Brain Station 23', 'Bangladesh Bank', 'a2i'
]

const KEYWORDS = [
  '.NET', 'C#', 'ASP.NET', 'Backend', 'Full-Stack', 'Senior',
  'Junior', 'React', 'Angular', 'Node.js', 'Python', 'Java'
]

function Settings() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(COMPANIES)
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(['.NET', 'C#', 'Backend'])
  const [emailDigest, setEmailDigest] = useState<'daily' | 'weekly' | 'none'>('daily')
  const [saved, setSaved] = useState(false)

  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company)
        ? prev.filter(c => c !== company)
        : [...prev, company]
    )
    setSaved(false)
  }

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords(prev =>
      prev.includes(keyword)
        ? prev.filter(k => k !== keyword)
        : [...prev, keyword]
    )
    setSaved(false)
  }

  const handleSave = () => {
    // Save preferences to localStorage
    localStorage.setItem('jobAlertPreferences', JSON.stringify({
      companies: selectedCompanies,
      keywords: selectedKeywords,
      emailDigest,
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      {/* Notification Settings */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Push Notifications</h2>
        </div>
        <NotificationSettings />
      </section>

      {/* Company Preferences */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Companies to Monitor</h2>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500 mb-3">
            Select which companies you want to receive job alerts from.
          </p>
          <div className="flex flex-wrap gap-2">
            {COMPANIES.map((company) => (
              <button
                key={company}
                onClick={() => toggleCompany(company)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCompanies.includes(company)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {company}
              </button>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setSelectedCompanies(COMPANIES)}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Select All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => setSelectedCompanies([])}
              className="text-xs text-primary-600 hover:text-primary-700"
            >
              Clear All
            </button>
          </div>
        </div>
      </section>

      {/* Keyword Preferences */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Keywords to Track</h2>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500 mb-3">
            Get notified when jobs match these keywords.
          </p>
          <div className="flex flex-wrap gap-2">
            {KEYWORDS.map((keyword) => (
              <button
                key={keyword}
                onClick={() => toggleKeyword(keyword)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedKeywords.includes(keyword)
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Email Digest */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Email Digest</h2>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500 mb-3">
            How often would you like to receive email summaries?
          </p>
          <div className="space-y-2">
            {[
              { value: 'daily', label: 'Daily', desc: 'Get a summary every morning' },
              { value: 'weekly', label: 'Weekly', desc: 'Get a summary every Monday' },
              { value: 'none', label: 'Never', desc: "Don't send email digests" },
            ].map((option) => (
              <label
                key={option.value}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  emailDigest === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="emailDigest"
                  value={option.value}
                  checked={emailDigest === option.value}
                  onChange={(e) => {
                    setEmailDigest(e.target.value as typeof emailDigest)
                    setSaved(false)
                  }}
                  className="w-4 h-4 text-primary-600"
                />
                <div>
                  <p className="font-medium text-gray-900">{option.label}</p>
                  <p className="text-sm text-gray-500">{option.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
          saved
            ? 'bg-green-600 text-white'
            : 'bg-primary-600 text-white hover:bg-primary-700'
        }`}
      >
        {saved ? (
          <>
            <Check className="w-5 h-5" />
            Saved!
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Preferences
          </>
        )}
      </button>
    </div>
  )
}

export default Settings
