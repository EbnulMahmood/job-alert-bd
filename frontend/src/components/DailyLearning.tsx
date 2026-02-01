import { useState } from 'react'
import {
  Play, CheckCircle, Circle, Clock, ExternalLink,
  ChevronDown, ChevronUp, Flame, Trophy, BookOpen,
  FileText, Video, Code, Briefcase, RotateCcw
} from 'lucide-react'
import type { CompanyTrack } from '../data/learningContent'
import useLearningProgress from '../hooks/useLearningProgress'

interface DailyLearningProps {
  track: CompanyTrack
  onBack?: () => void
}

function DailyLearning({ track, onBack }: DailyLearningProps) {
  const {
    getTrackProgress,
    startTrack,
    completeTask,
    completeTopic,
    saveNotes,
    resetTrack,
    stats,
  } = useLearningProgress()

  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const progress = getTrackProgress(track.companyName)
  const currentDay = progress?.currentDay || 1
  const completedDays = progress?.completedDays || 0

  // Get today's topic or selected topic
  const activeTopic = selectedDay
    ? track.topics.find(t => t.day === selectedDay)
    : track.topics.find(t => t.day === currentDay)

  const topicProgress = activeTopic && progress?.topics[activeTopic.id]

  const handleStartTrack = () => {
    startTrack(track)
  }

  const handleTaskToggle = (taskIndex: number) => {
    if (!activeTopic) return
    completeTask(
      track.companyName,
      activeTopic.id,
      taskIndex,
      activeTopic.tasks.length
    )
  }

  const handleCompleteTopic = () => {
    if (!activeTopic) return
    completeTopic(track.companyName, activeTopic.id, track)
    setSelectedDay(null) // Move to next day
  }

  const handleSaveNotes = () => {
    if (!activeTopic) return
    saveNotes(track.companyName, activeTopic.id, notes)
    setShowNotes(false)
  }

  const handleQuizSubmit = () => {
    if (!activeTopic?.quiz) return
    let correct = 0
    activeTopic.quiz.forEach((q, i) => {
      if (quizAnswers[i] === q.correctAnswer) correct++
    })
    const score = Math.round((correct / activeTopic.quiz.length) * 100)
    alert(`Quiz Score: ${score}% (${correct}/${activeTopic.quiz.length} correct)`)
    setShowQuiz(false)
    setQuizAnswers({})
  }

  const handleReset = () => {
    resetTrack(track.companyName)
    setShowConfirmReset(false)
    setSelectedDay(null)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="w-4 h-4" />
      case 'video': return <Video className="w-4 h-4" />
      case 'practice': return <Code className="w-4 h-4" />
      case 'project': return <Briefcase className="w-4 h-4" />
      default: return <ExternalLink className="w-4 h-4" />
    }
  }

  const completionPercentage = Math.round((completedDays / track.totalDays) * 100)

  if (!progress) {
    // Not started yet - show start screen
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-10">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{track.companyName}</h2>
          <p className="text-gray-600 mb-4">{track.description}</p>

          <div className="flex justify-center gap-6 mb-6 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">{track.totalDays}</p>
              <p className="text-gray-500">Days</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{track.topics.length}</p>
              <p className="text-gray-500">Topics</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {track.companyType === 'private' ? 'Private' : 'Govt'}
              </p>
              <p className="text-gray-500">Type</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-gray-900 mb-2">Interview Tips:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              {track.interviewTips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleStartTrack}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <Play className="w-5 h-5" />
            Start {track.totalDays}-Day Track
          </button>

          {onBack && (
            <button onClick={onBack} className="mt-4 text-gray-500 text-sm hover:text-gray-700">
              ← Back to tracks
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Stats */}
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
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedDays}/{track.totalDays}</p>
              <p className="text-xs text-gray-500">Days Done</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completionPercentage}%</p>
              <p className="text-xs text-gray-500">Complete</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Day {currentDay}</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900">{track.companyName} Track Progress</h3>
          <button
            onClick={() => setShowConfirmReset(true)}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-green-500 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        {/* Day Pills */}
        <div className="flex flex-wrap gap-1 mt-4">
          {track.topics.map((topic) => {
            const isCompleted = progress.topics[topic.id]?.completed
            const isCurrent = topic.day === currentDay && !selectedDay
            const isSelected = topic.day === selectedDay

            return (
              <button
                key={topic.id}
                onClick={() => setSelectedDay(topic.day === selectedDay ? null : topic.day)}
                className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isSelected || isCurrent
                    ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                    : topic.day <= currentDay
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? <CheckCircle className="w-4 h-4" /> : topic.day}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Topic */}
      {activeTopic && (
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge badge-blue">Day {activeTopic.day}</span>
                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  {activeTopic.duration}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{activeTopic.title}</h2>
              <p className="text-gray-600 mt-1">{activeTopic.description}</p>
            </div>
            {topicProgress?.completed && (
              <span className="badge badge-green flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Completed
              </span>
            )}
          </div>

          {/* Resources */}
          {activeTopic.resources.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-3">📚 Resources</h3>
              <div className="grid gap-2">
                {activeTopic.resources.map((resource, i) => (
                  <a
                    key={i}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      {getResourceIcon(resource.type)}
                    </div>
                    <span className="flex-1 text-sm font-medium text-gray-700">
                      {resource.title}
                    </span>
                    <span className="badge badge-gray text-xs">{resource.type}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tasks */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">✅ Today's Tasks</h3>
            <div className="space-y-2">
              {activeTopic.tasks.map((task, i) => {
                const isCompleted = topicProgress?.tasksCompleted?.[i] || false

                return (
                  <button
                    key={i}
                    onClick={() => handleTaskToggle(i)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      isCompleted
                        ? 'bg-green-50 text-green-800'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={isCompleted ? 'line-through opacity-70' : ''}>
                      {task}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quiz */}
          {activeTopic.quiz && activeTopic.quiz.length > 0 && (
            <div className="mb-6">
              <button
                onClick={() => setShowQuiz(!showQuiz)}
                className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700"
              >
                {showQuiz ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                📝 Quick Quiz ({activeTopic.quiz.length} questions)
              </button>

              {showQuiz && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  {activeTopic.quiz.map((q, qIndex) => (
                    <div key={qIndex} className="mb-4">
                      <p className="font-medium text-gray-900 mb-2">
                        {qIndex + 1}. {q.question}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((option, oIndex) => (
                          <label
                            key={oIndex}
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer ${
                              quizAnswers[qIndex] === oIndex
                                ? 'bg-primary-100 border-primary-500'
                                : 'bg-white hover:bg-gray-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`quiz-${qIndex}`}
                              checked={quizAnswers[qIndex] === oIndex}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleQuizSubmit}
                    className="btn-primary mt-2"
                  >
                    Submit Quiz
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Notes */}
          <div className="mb-6">
            <button
              onClick={() => {
                setNotes(topicProgress?.notes || '')
                setShowNotes(!showNotes)
              }}
              className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-800"
            >
              {showNotes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              📒 My Notes
              {topicProgress?.notes && <span className="text-xs text-green-600">(saved)</span>}
            </button>

            {showNotes && (
              <div className="mt-3">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes, key learnings, or questions here..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                />
                <button
                  onClick={handleSaveNotes}
                  className="btn-secondary mt-2"
                >
                  Save Notes
                </button>
              </div>
            )}
          </div>

          {/* Complete Day Button */}
          {!topicProgress?.completed && (
            <button
              onClick={handleCompleteTopic}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Mark Day {activeTopic.day} as Complete
            </button>
          )}

          {topicProgress?.completed && currentDay < track.totalDays && (
            <button
              onClick={() => setSelectedDay(currentDay)}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              Continue to Day {currentDay}
            </button>
          )}

          {completedDays === track.totalDays && (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Trophy className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-green-800">Congratulations! 🎉</h3>
              <p className="text-green-700">
                You've completed the {track.companyName} preparation track!
              </p>
              <a
                href={track.topics[track.topics.length - 1]?.resources[0]?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 btn-primary"
              >
                Apply Now <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* Reset Confirmation */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reset Progress?</h3>
            <p className="text-gray-600 mb-4">
              This will reset all your progress for the {track.companyName} track. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {onBack && (
        <button
          onClick={onBack}
          className="mt-6 text-gray-500 text-sm hover:text-gray-700"
        >
          ← Back to all tracks
        </button>
      )}
    </div>
  )
}

export default DailyLearning
