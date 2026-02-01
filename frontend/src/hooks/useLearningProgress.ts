/**
 * Hook for managing learning progress with localStorage persistence
 */
import { useState, useEffect, useCallback } from 'react'
import type { CompanyTrack } from '../data/learningContent'

export interface TopicProgress {
  topicId: string
  completed: boolean
  completedAt?: string
  tasksCompleted: boolean[]
  quizScore?: number
  notes?: string
}

export interface TrackProgress {
  companyName: string
  startedAt: string
  currentDay: number
  completedDays: number
  streak: number
  lastActivityAt: string
  topics: Record<string, TopicProgress>
}

export interface LearningStats {
  totalTracksStarted: number
  totalDaysCompleted: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: string
}

const STORAGE_KEY = 'job-alert-learning-progress'
const STATS_KEY = 'job-alert-learning-stats'

function getStoredProgress(): Record<string, TrackProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

function getStoredStats(): LearningStats {
  try {
    const stored = localStorage.getItem(STATS_KEY)
    return stored ? JSON.parse(stored) : {
      totalTracksStarted: 0,
      totalDaysCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: '',
    }
  } catch {
    return {
      totalTracksStarted: 0,
      totalDaysCompleted: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: '',
    }
  }
}

function saveProgress(progress: Record<string, TrackProgress>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function saveStats(stats: LearningStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

function isYesterday(dateString: string): boolean {
  const date = new Date(dateString)
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return date.toDateString() === yesterday.toDateString()
}

export function useLearningProgress() {
  const [allProgress, setAllProgress] = useState<Record<string, TrackProgress>>(() => getStoredProgress())
  const [stats, setStats] = useState<LearningStats>(() => getStoredStats())

  // Update streak on load
  useEffect(() => {
    const currentStats = getStoredStats()
    if (currentStats.lastActivityDate) {
      if (!isToday(currentStats.lastActivityDate) && !isYesterday(currentStats.lastActivityDate)) {
        // Streak broken
        currentStats.currentStreak = 0
        saveStats(currentStats)
        setStats(currentStats)
      }
    }
  }, [])

  const updateActivityStats = useCallback(() => {
    setStats(prev => {
      const today = new Date().toISOString().split('T')[0]
      const lastActivity = prev.lastActivityDate

      let newStreak = prev.currentStreak

      if (!lastActivity || !isToday(lastActivity)) {
        if (lastActivity && isYesterday(lastActivity)) {
          // Continue streak
          newStreak = prev.currentStreak + 1
        } else {
          // New streak or first activity
          newStreak = 1
        }
      }

      const newStats: LearningStats = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActivityDate: today,
      }

      saveStats(newStats)
      return newStats
    })
  }, [])

  const startTrack = useCallback((track: CompanyTrack) => {
    setAllProgress(prev => {
      if (prev[track.companyName]) {
        return prev // Already started
      }

      const newProgress: TrackProgress = {
        companyName: track.companyName,
        startedAt: new Date().toISOString(),
        currentDay: 1,
        completedDays: 0,
        streak: 0,
        lastActivityAt: new Date().toISOString(),
        topics: {},
      }

      const updated = { ...prev, [track.companyName]: newProgress }
      saveProgress(updated)

      // Update stats
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalTracksStarted: prevStats.totalTracksStarted + 1,
        }
        saveStats(newStats)
        return newStats
      })

      return updated
    })
  }, [])

  const getTrackProgress = useCallback((companyName: string): TrackProgress | undefined => {
    return allProgress[companyName]
  }, [allProgress])

  const completeTask = useCallback((companyName: string, topicId: string, taskIndex: number, totalTasks: number) => {
    setAllProgress(prev => {
      const trackProgress = prev[companyName]
      if (!trackProgress) return prev

      const topicProgress = trackProgress.topics[topicId] || {
        topicId,
        completed: false,
        tasksCompleted: new Array(totalTasks).fill(false),
      }

      const newTasksCompleted = [...topicProgress.tasksCompleted]
      newTasksCompleted[taskIndex] = !newTasksCompleted[taskIndex]

      const allTasksComplete = newTasksCompleted.every(Boolean)

      const newTopicProgress: TopicProgress = {
        ...topicProgress,
        tasksCompleted: newTasksCompleted,
        completed: allTasksComplete,
        completedAt: allTasksComplete ? new Date().toISOString() : undefined,
      }

      const updated = {
        ...prev,
        [companyName]: {
          ...trackProgress,
          lastActivityAt: new Date().toISOString(),
          topics: {
            ...trackProgress.topics,
            [topicId]: newTopicProgress,
          },
        },
      }

      saveProgress(updated)
      return updated
    })

    // Update stats
    updateActivityStats()
  }, [updateActivityStats])

  const completeTopic = useCallback((companyName: string, topicId: string, track: CompanyTrack) => {
    setAllProgress(prev => {
      const trackProgress = prev[companyName]
      if (!trackProgress) return prev

      const topic = track.topics.find(t => t.id === topicId)
      if (!topic) return prev

      const topicProgress: TopicProgress = {
        topicId,
        completed: true,
        completedAt: new Date().toISOString(),
        tasksCompleted: new Array(topic.tasks.length).fill(true),
      }

      // Calculate new completed days
      const updatedTopics = {
        ...trackProgress.topics,
        [topicId]: topicProgress,
      }

      const completedDays = Object.values(updatedTopics).filter(t => t.completed).length
      const currentDay = Math.min(completedDays + 1, track.totalDays)

      const updated = {
        ...prev,
        [companyName]: {
          ...trackProgress,
          lastActivityAt: new Date().toISOString(),
          currentDay,
          completedDays,
          topics: updatedTopics,
        },
      }

      saveProgress(updated)

      // Update stats
      setStats(prevStats => {
        const newStats = {
          ...prevStats,
          totalDaysCompleted: prevStats.totalDaysCompleted + 1,
        }
        saveStats(newStats)
        return newStats
      })

      return updated
    })

    updateActivityStats()
  }, [updateActivityStats])

  const saveQuizScore = useCallback((companyName: string, topicId: string, score: number) => {
    setAllProgress(prev => {
      const trackProgress = prev[companyName]
      if (!trackProgress) return prev

      const topicProgress = trackProgress.topics[topicId]
      if (!topicProgress) return prev

      const updated = {
        ...prev,
        [companyName]: {
          ...trackProgress,
          topics: {
            ...trackProgress.topics,
            [topicId]: {
              ...topicProgress,
              quizScore: score,
            },
          },
        },
      }

      saveProgress(updated)
      return updated
    })
  }, [])

  const saveNotes = useCallback((companyName: string, topicId: string, notes: string) => {
    setAllProgress(prev => {
      const trackProgress = prev[companyName]
      if (!trackProgress) return prev

      const topicProgress = trackProgress.topics[topicId] || {
        topicId,
        completed: false,
        tasksCompleted: [],
      }

      const updated = {
        ...prev,
        [companyName]: {
          ...trackProgress,
          topics: {
            ...trackProgress.topics,
            [topicId]: {
              ...topicProgress,
              notes,
            },
          },
        },
      }

      saveProgress(updated)
      return updated
    })
  }, [])

  const resetTrack = useCallback((companyName: string) => {
    setAllProgress(prev => {
      const { [companyName]: _removed, ...rest } = prev
      saveProgress(rest)
      return rest
    })
  }, [])

  const getTodaysTopic = useCallback((track: CompanyTrack) => {
    const progress = allProgress[track.companyName]
    if (!progress) return track.topics[0]

    const currentDay = progress.currentDay
    return track.topics.find(t => t.day === currentDay)
  }, [allProgress])

  const getCompletionPercentage = useCallback((companyName: string, totalDays: number): number => {
    const progress = allProgress[companyName]
    if (!progress) return 0
    return Math.round((progress.completedDays / totalDays) * 100)
  }, [allProgress])

  return {
    allProgress,
    stats,
    startTrack,
    getTrackProgress,
    completeTask,
    completeTopic,
    saveQuizScore,
    saveNotes,
    resetTrack,
    getTodaysTopic,
    getCompletionPercentage,
  }
}

export default useLearningProgress
