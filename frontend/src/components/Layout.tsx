import { Outlet, NavLink } from 'react-router-dom'
import { Briefcase, BookOpen, Settings, Home, GraduationCap } from 'lucide-react'

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BD Job Alert</h1>
                <p className="text-xs text-gray-500">Tech Jobs in Bangladesh</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <Home className="w-4 h-4" />
                Home
              </NavLink>
              <NavLink
                to="/jobs"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <Briefcase className="w-4 h-4" />
                Jobs
              </NavLink>
              <NavLink
                to="/learning"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <GraduationCap className="w-4 h-4" />
                Learn
              </NavLink>
              <NavLink
                to="/preparation"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <BookOpen className="w-4 h-4" />
                Prep
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <Settings className="w-4 h-4" />
                Settings
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around items-center py-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-xs">Jobs</span>
          </NavLink>
          <NavLink
            to="/learning"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs">Learn</span>
          </NavLink>
          <NavLink
            to="/preparation"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-xs">Prep</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-2 ${
                isActive ? 'text-primary-600' : 'text-gray-500'
              }`
            }
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </NavLink>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </div>
  )
}

export default Layout
