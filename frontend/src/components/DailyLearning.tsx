import { useState } from 'react'
import {
  Play, CheckCircle, Circle, Clock, ExternalLink,
  ChevronDown, ChevronUp, Flame, Trophy, BookOpen,
  FileText, Video, Code, Briefcase, RotateCcw,
  Lightbulb, AlertTriangle, MessageSquare
} from 'lucide-react'
import type { CompanyTrack } from '../data/learningTypes'
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
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
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
    setQuizScore(correct)
    setQuizSubmitted(true)
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

          {/* Key Concepts - compact summary at top */}
          {activeTopic.keyConcepts && activeTopic.keyConcepts.length > 0 && (
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2 text-sm">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                Key Takeaways
              </h3>
              <ul className="space-y-1">
                {activeTopic.keyConcepts.map((concept, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-500 mt-1 flex-shrink-0 text-xs">●</span>
                    {concept}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Explanation - collapsible */}
          {activeTopic.detailedExplanation && (
            <details className="mb-6">
              <summary className="flex items-center gap-2 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
                <BookOpen className="w-4 h-4 text-primary-600" />
                Read Explanation
              </summary>
              <div className="mt-3 bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {activeTopic.detailedExplanation}
              </div>
            </details>
          )}

          {/* Code Examples */}
          {activeTopic.codeExamples && activeTopic.codeExamples.length > 0 && (
            <details className="mb-6">
              <summary className="flex items-center gap-2 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
                <Code className="w-4 h-4 text-blue-600" />
                Code Examples ({activeTopic.codeExamples.length})
              </summary>
              <div className="mt-3 space-y-4">
                {activeTopic.codeExamples.map((example, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 text-gray-200 px-4 py-2 flex items-center justify-between">
                      <span className="text-sm font-medium">{example.title}</span>
                      <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">{example.language}</span>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm leading-relaxed">
                      <code>{example.code}</code>
                    </pre>
                    {example.output && (
                      <div className="bg-gray-100 px-4 py-2 border-t border-gray-200">
                        <span className="text-xs text-gray-500 font-medium">Output:</span>
                        <pre className="text-sm text-gray-800 mt-1">{example.output}</pre>
                      </div>
                    )}
                    <div className="p-4 bg-white">
                      <p className="text-sm text-gray-600">{example.explanation}</p>
                      {example.keyPoints.length > 0 && (
                        <ul className="mt-2 space-y-1">
                          {example.keyPoints.map((point, j) => (
                            <li key={j} className="text-xs text-gray-500 flex items-start gap-1">
                              <span className="text-primary-500 mt-0.5">▸</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Practice Problems */}
          {activeTopic.practiceProblems && activeTopic.practiceProblems.length > 0 && (
            <details className="mb-6">
              <summary className="flex items-center gap-2 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
                <Briefcase className="w-4 h-4 text-red-600" />
                Practice Problems ({activeTopic.practiceProblems.length})
              </summary>
              <div className="mt-3 space-y-4">
                {activeTopic.practiceProblems.map((problem, i) => {
                  const diffColor = {
                    easy: 'bg-green-100 text-green-700',
                    medium: 'bg-yellow-100 text-yellow-700',
                    hard: 'bg-red-100 text-red-700',
                  }[problem.difficulty]

                  return (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h4 className="font-semibold text-gray-900">{problem.title}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffColor}`}>
                          {problem.difficulty}
                        </span>
                        {problem.companiesAsked && problem.companiesAsked.length > 0 && (
                          <span className="text-xs text-gray-400">
                            Asked at: {problem.companiesAsked.join(', ')}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{problem.description}</p>

                      {/* Sample I/O */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        <div className="bg-gray-50 rounded p-3">
                          <span className="text-xs font-medium text-gray-500">Sample Input:</span>
                          <pre className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{problem.sampleInput}</pre>
                        </div>
                        <div className="bg-gray-50 rounded p-3">
                          <span className="text-xs font-medium text-gray-500">Sample Output:</span>
                          <pre className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{problem.sampleOutput}</pre>
                        </div>
                      </div>

                      {/* Hints */}
                      {problem.hints.length > 0 && (
                        <details className="mb-3">
                          <summary className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                            💡 Hints ({problem.hints.length})
                          </summary>
                          <ul className="mt-2 space-y-1 pl-4">
                            {problem.hints.map((hint, j) => (
                              <li key={j} className="text-sm text-gray-600 list-disc">{hint}</li>
                            ))}
                          </ul>
                        </details>
                      )}

                      {/* Solution Approaches */}
                      {problem.approaches.length > 0 && (
                        <details>
                          <summary className="text-sm font-medium text-green-600 cursor-pointer hover:text-green-700">
                            🧠 Solution Approaches ({problem.approaches.length})
                          </summary>
                          <div className="mt-2 space-y-3">
                            {problem.approaches.map((approach, j) => (
                              <div key={j} className="bg-green-50 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="font-medium text-sm text-gray-900">{approach.name}</span>
                                  <span className="text-xs bg-white px-2 py-0.5 rounded text-gray-500">
                                    Time: {approach.timeComplexity}
                                  </span>
                                  <span className="text-xs bg-white px-2 py-0.5 rounded text-gray-500">
                                    Space: {approach.spaceComplexity}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{approach.explanation}</p>
                                <pre className="bg-white rounded p-2 text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                                  {approach.pseudocode}
                                </pre>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}

                      {/* Related Topics */}
                      {problem.relatedTopics.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {problem.relatedTopics.map((topic, j) => (
                            <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </details>
          )}

          {/* Tasks */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-3">✅ Today's Tasks</h3>
            <div className="space-y-2">
              {activeTopic.tasks.map((task, i) => {
                const isCompleted = topicProgress?.tasksCompleted?.[i] || false
                const isDetailed = typeof task === 'object'
                const taskTitle = isDetailed ? task.title : task
                const taskDetail = isDetailed ? task : null

                return (
                  <div key={i}>
                    <button
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
                      <div className="flex-1">
                        <span className={isCompleted ? 'line-through opacity-70' : ''}>
                          {taskTitle}
                        </span>
                        {taskDetail && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">{taskDetail.type}</span>
                            <span className="text-xs text-gray-400">{taskDetail.estimatedTime}</span>
                            {taskDetail.difficulty && (
                              <span className={`text-xs px-1.5 py-0.5 rounded ${
                                taskDetail.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                                taskDetail.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-red-100 text-red-600'
                              }`}>{taskDetail.difficulty}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                    {taskDetail && !isCompleted && (
                      <div className="ml-11 mt-1 text-xs text-gray-500 space-y-1">
                        <p>{taskDetail.description}</p>
                        <p className="text-gray-400">Expected: {taskDetail.expectedOutcome}</p>
                      </div>
                    )}
                  </div>
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
                  {activeTopic.quiz.map((q, qIndex) => {
                    const isAnswered = quizSubmitted && quizAnswers[qIndex] !== undefined
                    const isCorrect = isAnswered && quizAnswers[qIndex] === q.correctAnswer

                    return (
                      <div key={qIndex} className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium text-gray-900">
                            {qIndex + 1}. {q.question}
                          </p>
                          {q.difficulty && (
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              q.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                              q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>{q.difficulty}</span>
                          )}
                        </div>
                        {q.codeSnippet && (
                          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm mb-2 overflow-x-auto">
                            <code>{q.codeSnippet}</code>
                          </pre>
                        )}
                        <div className="space-y-2">
                          {q.options.map((option, oIndex) => {
                            let optionStyle = 'bg-white hover:bg-gray-50'
                            if (quizSubmitted && quizAnswers[qIndex] !== undefined) {
                              if (oIndex === q.correctAnswer) {
                                optionStyle = 'bg-green-100 border-green-500 ring-1 ring-green-400'
                              } else if (oIndex === quizAnswers[qIndex] && oIndex !== q.correctAnswer) {
                                optionStyle = 'bg-red-100 border-red-500 ring-1 ring-red-400'
                              }
                            } else if (quizAnswers[qIndex] === oIndex) {
                              optionStyle = 'bg-primary-100 border-primary-500'
                            }

                            return (
                              <label
                                key={oIndex}
                                className={`flex items-center gap-2 p-2 rounded cursor-pointer ${optionStyle}`}
                              >
                                <input
                                  type="radio"
                                  name={`quiz-${qIndex}`}
                                  checked={quizAnswers[qIndex] === oIndex}
                                  onChange={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [qIndex]: oIndex })}
                                  disabled={quizSubmitted}
                                  className="w-4 h-4"
                                />
                                <span className="text-sm">{option}</span>
                              </label>
                            )
                          })}
                        </div>
                        {quizSubmitted && q.explanation && (
                          <div className={`mt-2 p-2 rounded text-sm ${isCorrect ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                            <span className="font-medium">{isCorrect ? '✓ Correct!' : '✗ Incorrect.'}</span>{' '}
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  {!quizSubmitted ? (
                    <button onClick={handleQuizSubmit} className="btn-primary mt-2">
                      Submit Quiz
                    </button>
                  ) : (
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm font-medium text-gray-700">
                        Score: {quizScore}/{activeTopic.quiz.length}
                      </span>
                      <button
                        onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setQuizScore(0) }}
                        className="btn-secondary text-sm"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Interview Questions */}
          {activeTopic.interviewQuestions && activeTopic.interviewQuestions.length > 0 && (
            <details className="mb-6">
              <summary className="flex items-center gap-2 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
                <MessageSquare className="w-4 h-4 text-purple-600" />
                Interview Questions ({activeTopic.interviewQuestions.length})
              </summary>
              <div className="mt-3 space-y-3">
                {activeTopic.interviewQuestions.map((iq, i) => (
                  <details key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <summary className="p-3 bg-purple-50 cursor-pointer hover:bg-purple-100 font-medium text-sm text-gray-800">
                      Q{i + 1}: {iq.question}
                    </summary>
                    <div className="p-3">
                      <p className="text-sm text-gray-700 whitespace-pre-line">{iq.answer}</p>
                      {iq.followUp.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <span className="text-xs font-medium text-gray-500">Follow-up Questions:</span>
                          <ul className="mt-1 space-y-1">
                            {iq.followUp.map((f, j) => (
                              <li key={j} className="text-xs text-purple-600">→ {f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          )}

          {/* Common Mistakes */}
          {activeTopic.commonMistakes && activeTopic.commonMistakes.length > 0 && (
            <details className="mb-6">
              <summary className="flex items-center gap-2 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                Common Mistakes ({activeTopic.commonMistakes.length})
              </summary>
              <div className="mt-3 grid gap-2">
                {activeTopic.commonMistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-orange-50 rounded-lg">
                    <span className="text-orange-500 mt-0.5 flex-shrink-0">⚠</span>
                    <span className="text-sm text-gray-700">{mistake}</span>
                  </div>
                ))}
              </div>
            </details>
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
