import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Building2, TrendingUp, ArrowRight, GraduationCap, BookOpen, Trophy, Compass, AlertTriangle, Loader2 } from 'lucide-react'
import { jobsApi } from '../services/api'
import JobCard from '../components/JobCard'

function Home() {
  const { data: stats, isLoading: statsLoading, isError: statsError, isFetching: statsFetching } = useQuery({
    queryKey: ['stats'],
    queryFn: jobsApi.getStats,
    refetchInterval: (query) => query.state.status === 'error' ? 15000 : false,
  })

  const { data: recentJobs, isLoading: jobsLoading, isError: jobsError, isFetching: jobsFetching } = useQuery({
    queryKey: ['jobs', 'recent'],
    queryFn: () => jobsApi.getJobs({ page: 1, per_page: 5 }),
    refetchInterval: (query) => query.state.status === 'error' ? 15000 : false,
  })

  const isServerWaking = (statsLoading || jobsLoading) && (statsFetching || jobsFetching)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-10 text-white mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Master Your Tech Interview
        </h1>
        <p className="text-primary-100 mb-6 max-w-2xl">
          Company-specific preparation tracks for top Bangladesh tech companies.
          Daily learning plans, interview guides, and curated resources for .NET, C#, and backend developers.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/learning" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center gap-2">
            Start Learning
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/preparation" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Preparation Guide
          </Link>
        </div>
      </div>

      {/* Server Status Banner */}
      {(statsError || jobsError) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-amber-800 font-medium text-sm">Server is starting up...</p>
            <p className="text-amber-600 text-sm mt-1">
              Our backend server sleeps when inactive. It usually takes 1-2 minutes to wake up.
              The page will auto-refresh once connected. Learning tracks work offline!
            </p>
          </div>
        </div>
      )}

      {isServerWaking && !statsError && !jobsError && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin flex-shrink-0" />
          <p className="text-blue-700 text-sm">Loading data from server...</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">9</p>
              <p className="text-sm text-gray-500">Learning Tracks</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? '...' : Object.keys(stats?.by_company || {}).length || 10}
              </p>
              <p className="text-sm text-gray-500">Companies</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? '...' : stats?.total_jobs || 0}
              </p>
              <p className="text-sm text-gray-500">Opportunities</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Daily</p>
              <p className="text-sm text-gray-500">New Content</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/learning" className="card hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-200 transition-colors">
              <GraduationCap className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Daily Learning</h3>
              <p className="text-sm text-gray-500">Company-specific prep tracks</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </Link>

        <Link to="/rankings" className="card hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Company Rankings</h3>
              <p className="text-sm text-gray-500">Top companies rated & compared</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </Link>

        <Link to="/jobs" className="card hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Compass className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Explore Opportunities</h3>
              <p className="text-sm text-gray-500">Latest openings from top companies</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </Link>
      </div>

      {/* Recent Opportunities */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Latest Opportunities</h2>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {jobsError ? (
          <div className="card text-center py-10">
            <AlertTriangle className="w-12 h-12 text-amber-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Server is waking up...</p>
            <p className="text-gray-400 text-sm mt-1">Jobs will appear shortly. Meanwhile, explore our <Link to="/learning" className="text-primary-600 hover:underline">Learning Tracks</Link>!</p>
          </div>
        ) : jobsLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : recentJobs?.jobs && recentJobs.jobs.length > 0 ? (
          <div className="space-y-4">
            {recentJobs.jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="card text-center py-10">
            <Compass className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No opportunities found yet. Check back later!</p>
          </div>
        )}
      </div>

      {/* Companies We Cover */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Companies We Cover</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            'Cefalo', 'Kaz Software', 'SELISE', 'Enosis', 'BJIT',
            'Samsung R&D', 'Therap BD', 'Brain Station 23', 'Bangladesh Bank', 'a2i'
          ].map((company) => (
            <div key={company} className="card text-center py-4">
              <Building2 className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">{company}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
