export default function Dashboard() {
    return (
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-8">Wedding Dashboard</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-wedding-pink/20">
              <h3 className="font-semibold text-lg mb-2">Guest List</h3>
              <p className="text-gray-600">0 guests invited</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-wedding-pink/20">
              <h3 className="font-semibold text-lg mb-2">Budget</h3>
              <p className="text-gray-600">$0 of $10,000</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-wedding-pink/20">
              <h3 className="font-semibold text-lg mb-2">Timeline</h3>
              <p className="text-gray-600">0/15 tasks completed</p>
            </div>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-md border border-wedding-pink/20">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </div>
    )
  }