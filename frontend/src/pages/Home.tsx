import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Briefcase, Building2, TrendingUp, ArrowRight, Bell } from 'lucide-react'
import { jobsApi } from '../services/api'
import JobCard from '../components/JobCard'
import NotificationSettings from '../components/NotificationSettings'

function Home() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats'],
    queryFn: jobsApi.getStats,
  })

  const { data: recentJobs, isLoading: jobsLoading } = useQuery({
    queryKey: ['jobs', 'recent'],
    queryFn: () => jobsApi.getJobs({ page: 1, per_page: 5 }),
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 md:p-10 text-white mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">
          Find Your Next Tech Job in Bangladesh
        </h1>
        <p className="text-primary-100 mb-6 max-w-2xl">
          Monitor job openings from top tech companies like Cefalo, SELISE, Samsung R&D,
          and more. Get instant alerts for .NET, C#, and software developer positions.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/jobs" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center gap-2">
            Browse Jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/settings" className="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Set Up Alerts
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {statsLoading ? '...' : stats?.total_jobs || 0}
              </p>
              <p className="text-sm text-gray-500">Active Jobs</p>
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
                {statsLoading ? '...' : Object.keys(stats?.by_company || {}).length}
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
                {statsLoading ? '...' : stats?.by_experience_level?.['Senior'] || 0}
              </p>
              <p className="text-sm text-gray-500">Senior Roles</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">Daily</p>
              <p className="text-sm text-gray-500">Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Setup */}
      <div className="mb-8">
        <NotificationSettings />
      </div>

      {/* Recent Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Job Openings</h2>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {jobsLoading ? (
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
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No jobs found yet. Check back later!</p>
          </div>
        )}
      </div>

      {/* Companies Being Monitored */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Companies We Monitor</h2>
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
