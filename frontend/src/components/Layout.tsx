import { useState, useEffect, useRef } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { BookOpen, Settings, Home, GraduationCap, Trophy, MoreHorizontal, Compass } from 'lucide-react'

function Layout() {
  const [showMore, setShowMore] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const isMoreActive = ['/rankings', '/settings'].some(p => location.pathname.startsWith(p))

  // Close "More" menu on route change or outside click
  useEffect(() => {
    setShowMore(false)
  }, [location.pathname])

  useEffect(() => {
    if (!showMore) return
    const handleClick = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showMore])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BD Tech Prep</h1>
                <p className="text-xs text-gray-500">Interview Prep & Career Guide</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                end
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
                <Compass className="w-4 h-4" />
                Explore
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
                to="/rankings"
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium ${
                    isActive ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'
                  }`
                }
              >
                <Trophy className="w-4 h-4" />
                Rankings
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
            end
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
            <Compass className="w-5 h-5" />
            <span className="text-xs">Explore</span>
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

          {/* More Menu */}
          <div className="relative" ref={moreRef}>
            <button
              onClick={() => setShowMore(!showMore)}
              className={`flex flex-col items-center gap-1 px-4 py-2 ${
                isMoreActive ? 'text-primary-600' : 'text-gray-500'
              }`}
            >
              <MoreHorizontal className="w-5 h-5" />
              <span className="text-xs">More</span>
            </button>

            {showMore && (
              <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-40">
                <NavLink
                  to="/rankings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm ${
                      isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Trophy className="w-4 h-4" />
                  Rankings
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm ${
                      isActive ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer for mobile bottom nav */}
      <div className="md:hidden h-16" />
    </div>
  )
}

export default Layout
