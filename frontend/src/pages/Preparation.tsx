import PreparationGuide from '../components/PreparationGuide'

function Preparation() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Interview Preparation</h1>
        <p className="text-gray-600">
          Prepare for your next tech interview with this comprehensive guide tailored
          for Bangladesh's top tech companies.
        </p>
      </div>

      <PreparationGuide />

      {/* 4-Week Study Plan */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">4-Week Study Plan</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="card border-l-4 border-l-blue-500">
            <h3 className="font-semibold text-gray-900 mb-2">Week 1: Fundamentals</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Day 1-2: C# advanced features (async/await, LINQ)</li>
              <li>• Day 3-4: .NET Core Web API</li>
              <li>• Day 5-6: Entity Framework Core</li>
              <li>• Day 7: Review + 5 LeetCode problems</li>
            </ul>
          </div>

          <div className="card border-l-4 border-l-green-500">
            <h3 className="font-semibold text-gray-900 mb-2">Week 2: Database & Architecture</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Day 1-2: SQL Server (joins, optimization)</li>
              <li>• Day 3-4: Design Patterns</li>
              <li>• Day 5-6: Clean Architecture</li>
              <li>• Day 7: Review + 5 LeetCode problems</li>
            </ul>
          </div>

          <div className="card border-l-4 border-l-yellow-500">
            <h3 className="font-semibold text-gray-900 mb-2">Week 3: DSA Focus</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Day 1-2: Arrays, Strings, HashMaps</li>
              <li>• Day 3-4: Trees, Graphs</li>
              <li>• Day 5-6: Dynamic Programming basics</li>
              <li>• Day 7: Review + mock interview</li>
            </ul>
          </div>

          <div className="card border-l-4 border-l-purple-500">
            <h3 className="font-semibold text-gray-900 mb-2">Week 4: Mock Interviews</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Day 1-2: System design practice</li>
              <li>• Day 3-4: Build/polish portfolio project</li>
              <li>• Day 5-6: Mock interviews</li>
              <li>• Day 7: Company research, apply!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Resume Tips */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Tips</h2>
        <div className="card">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-green-700 mb-2">✓ Do</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Keep it 1-2 pages max</li>
                <li>• Highlight years of experience with specific technologies</li>
                <li>• Include notable projects with measurable impact</li>
                <li>• Add GitHub profile with active projects</li>
                <li>• Include LinkedIn profile</li>
                <li>• List relevant certifications (Azure, AWS)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-red-700 mb-2">✗ Avoid</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Generic objective statements</li>
                <li>• Outdated technologies</li>
                <li>• Typos and grammatical errors</li>
                <li>• Irrelevant work experience</li>
                <li>• Unprofessional email addresses</li>
                <li>• Excessive length (3+ pages)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preparation
