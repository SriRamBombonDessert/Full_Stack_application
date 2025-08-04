import { Link } from "next/link"
import { Coffee, Users, Shield } from "lucide-react"

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-6">
            <Coffee className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            BOMBÓN DESSERT
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-light tracking-wide">'HAPPINESS SERVED ON A PLATE'</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <span className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 border border-white/20">
              In & Out
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="group hover:scale-105 transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl rounded-lg overflow-hidden">
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer View</h2>
              <p className="text-gray-600 mb-6">Browse our delicious menu and discover amazing desserts</p>
              <Link
                to="/customer"
                className="inline-block w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                View Menu
              </Link>
            </div>
          </div>

          <div className="group hover:scale-105 transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl rounded-lg overflow-hidden">
            <div className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Panel</h2>
              <p className="text-gray-600 mb-6">Manage menu items, prices, and availability</p>
              <Link
                to="/admin"
                className="inline-block w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Admin Access
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live Menu Updates</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
