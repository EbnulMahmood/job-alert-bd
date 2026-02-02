import { useState } from 'react'
import {
  BookOpen, Building2, Flame, Trophy, CheckCircle,
  Clock, ChevronRight, Star, Filter
} from 'lucide-react'
import { allTracks, type CompanyTrack } from '../data/learningContent'
import DailyLearning from '../components/DailyLearning'
import useLearningProgress from '../hooks/useLearningProgress'

function Learning() {
  const [selectedTrack, setSelectedTrack] = useState<CompanyTrack | null>(null)
  const [filterType, setFilterType] = useState<'all' | 'private' | 'government'>('all')

  const { allProgress, stats, getCompletionPercentage } = useLearningProgress()

  const filteredTracks = allTracks.filter(track => {
    if (filterType === 'all') return true
    return track.companyType === filterType
  })

  // Sort: in-progress first, then by completion
  const sortedTracks = [...filteredTracks].sort((a, b) => {
    const aProgress = allProgress[a.companyName]
    const bProgress = allProgress[b.companyName]

    // In-progress tracks first
    if (aProgress && !bProgress) return -1
    if (!aProgress && bProgress) return 1

    // Then by completion percentage (less complete first to encourage finishing)
    if (aProgress && bProgress) {
      const aPercent = getCompletionPercentage(a.companyName, a.totalDays)
      const bPercent = getCompletionPercentage(b.companyName, b.totalDays)
      if (aPercent < 100 && bPercent === 100) return -1
      if (aPercent === 100 && bPercent < 100) return 1
    }

    return 0
  })

  if (selectedTrack) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <DailyLearning
          track={selectedTrack}
          onBack={() => setSelectedTrack(null)}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Daily Learning</h1>
        <p className="text-gray-600">
          Company-specific interview preparation tracks. Complete daily tasks to build your skills.
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Flame className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.currentStreak}</p>
              <p className="text-xs text-gray-500">Day Streak</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.longestStreak}</p>
              <p className="text-xs text-gray-500">Best Streak</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTracksStarted}</p>
              <p className="text-xs text-gray-500">Tracks Started</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDaysCompleted}</p>
              <p className="text-xs text-gray-500">Days Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Learning Banner (if there's an in-progress track) */}
      {Object.values(allProgress).some(p => {
        const track = allTracks.find(t => t.companyName === p.companyName)
        return p.completedDays > 0 && track != null && p.completedDays < track.totalDays
      }) && (
        <div className="card bg-gradient-to-r from-primary-600 to-primary-800 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Continue Learning</h3>
              <p className="text-primary-100 text-sm">
                Keep your streak going! Complete today's tasks.
              </p>
            </div>
            <button
              onClick={() => {
                const inProgressTrack = sortedTracks.find(t => {
                  const progress = allProgress[t.companyName]
                  return progress && progress.completedDays < t.totalDays
                })
                if (inProgressTrack) setSelectedTrack(inProgressTrack)
              }}
              className="bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">Filter:</span>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'private', label: 'Private' },
            { value: 'government', label: 'Government' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilterType(opt.value as typeof filterType)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filterType === opt.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Track List */}
      <div className="space-y-4">
        {sortedTracks.map((track) => {
          const progress = allProgress[track.companyName]
          const completionPercent = progress
            ? getCompletionPercentage(track.companyName, track.totalDays)
            : 0
          const isCompleted = completionPercent === 100
          const isInProgress = progress && !isCompleted

          return (
            <div
              key={track.companyName}
              className={`card hover:shadow-md transition-all cursor-pointer ${
                isInProgress ? 'ring-2 ring-primary-500 ring-offset-2' : ''
              }`}
              onClick={() => setSelectedTrack(track)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  isCompleted
                    ? 'bg-green-100'
                    : isInProgress
                    ? 'bg-primary-100'
                    : 'bg-gray-100'
                }`}>
                  {isCompleted ? (
                    <Trophy className="w-7 h-7 text-green-600" />
                  ) : (
                    <Building2 className={`w-7 h-7 ${
                      isInProgress ? 'text-primary-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{track.companyName}</h3>
                    <span className={`badge ${
                      track.companyType === 'private' ? 'badge-blue' : 'badge-yellow'
                    }`}>
                      {track.companyType === 'private' ? 'Private' : 'Govt'}
                    </span>
                    {isInProgress && (
                      <span className="badge badge-green">In Progress</span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 truncate mb-2">
                    {track.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {track.totalDays} days
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {track.topics.length} topics
                    </span>
                    {progress && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {progress.completedDays} completed
                      </span>
                    )}
                  </div>

                  {/* Progress bar */}
                  {progress && (
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isCompleted ? 'bg-green-500' : 'bg-primary-500'
                          }`}
                          style={{ width: `${completionPercent}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredTracks.length === 0 && (
        <div className="card text-center py-10">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No tracks found for this filter.</p>
        </div>
      )}

      {/* Track Count Info */}
      <div className="mt-8 card bg-gray-50">
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            {allTracks.length} company-specific preparation tracks available.
            Each track is tailored to the company's actual interview process.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Learning
