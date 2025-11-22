import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Landing() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-gentle"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-gentle animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">StockMaster</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all duration-300 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                🚀 Smart Inventory Management
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Manage Your Warehouse
              <span className="block text-blue-600 mt-2">
                Efficiently & Effortlessly
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Streamline your inventory operations with real-time tracking, smart analytics, and automated workflows. Perfect for modern warehouses.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Free Trial</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/demo"
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 hover:shadow-md transition-all duration-300"
              >
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-500 mt-1">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">99.9%</div>
                <div className="text-sm text-gray-500 mt-1">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-500 mt-1">Support</div>
              </div>
            </div>
          </div>

          {/* Right - Animated Warehouse Illustration */}
          <div className="relative">
            {/* Animated Warehouse SVG */}
            <div className="relative">
              <svg viewBox="0 0 500 400" className="w-full h-auto">
                {/* Warehouse Building */}
                <g className="animate-slide-up">
                  {/* Main building */}
                  <rect x="100" y="150" width="300" height="200" fill="#E0E7FF" stroke="#818CF8" strokeWidth="3" rx="5"/>
                  
                  {/* Roof */}
                  <polygon points="250,100 80,150 420,150" fill="#6366F1" stroke="#4F46E5" strokeWidth="3"/>
                  
                  {/* Door */}
                  <rect x="210" y="260" width="80" height="90" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" rx="3"/>
                  
                  {/* Windows */}
                  <rect x="130" y="180" width="50" height="40" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" rx="2" className="animate-window-glow"/>
                  <rect x="320" y="180" width="50" height="40" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" rx="2" className="animate-window-glow animation-delay-1000"/>
                  <rect x="130" y="240" width="50" height="40" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" rx="2" className="animate-window-glow animation-delay-2000"/>
                  <rect x="320" y="240" width="50" height="40" fill="#DBEAFE" stroke="#60A5FA" strokeWidth="2" rx="2" className="animate-window-glow animation-delay-3000"/>
                </g>

                {/* Animated Forklift */}
                <g className="animate-forklift">
                  {/* Forklift body */}
                  <rect x="20" y="300" width="60" height="40" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" rx="3"/>
                  
                  {/* Forklift fork */}
                  <rect x="75" y="295" width="5" height="35" fill="#F87171" stroke="#DC2626" strokeWidth="1"/>
                  <rect x="75" y="285" width="25" height="5" fill="#F87171" stroke="#DC2626" strokeWidth="1"/>
                  
                  {/* Wheels */}
                  ircle cx="35" cy="345" r="8" fill="#1F2937" stroke="#11111827" strokeWidth="2"/>
                  ircle cx="65" cy="345" r="8" fill="#1F2937" stroke="#111827" strokeWidth="="2"/>
                  
                  {/* Window */}
                  <rect x="45" y="310" width="20" height="15" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1" rx="2"/>
                </g>

                {/* Animated Boxes on Shelf */}
                <g className="animate-bounce-subtle">
                  {/* Box 1 */}
                  <rect x="140" y="290" width="35" height="35" fill="#FED7AA" stroke="#F97316" strokeWidth="2" rx="2"/>
                  <line x1="157" y1="290" x2="157" y2="325" stroke="#EA580C" strokeWidth="1.5"/>
                  <line x1="140" y1="307" x2="175" y2="307" stroke="#EA580C" strokeWidth="1.5"/>
                  
                  {/* Box 2 */}
                  <rect x="180" y="295" width="30" height="30" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" rx="2"/>
                  <line x1="195" y1="295" x2="195" y2="325" stroke="#0369A1" strokeWidth="1.5"/>
                  <line x1="180" y1="310" x2="210" y2="310" stroke="#0369A1" strokeWidth="1.5"/>
                </g>

                {/* Floating Documents */}
                <g className="animate-float-document">
                  <rect x="350" y="120" width="40" height="50" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2" rx="2"/>
                  <line x1="360" y1="135" x2="380" y2="135" stroke="#3B82F6" strokeWidth="2"/>
                  <line x1="360" y1="145" x2="380" y2="145" stroke="#3B82F6" strokeWidth="2"/>
                  <line x1="360" y1="155" x2="375" y2="155" stroke="#3B82F6" strokeWidth="2"/>
                </g>

                {/* Animated Package Delivery */}
                <g className="animate-package-move">
                  <rect x="420" y="180" width="30" height="30" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" rx="2"/>
                  <line x1="435" y1="180" x2="435" y2="210" stroke="#D97706" strokeWidth="1.5"/>
                  <line x1="420" y1="195" x2="450" y2="195" stroke="#D97706" strokeWidth="1.5"/>
                  {/* Delivery arrow */}
                  <path d="M 445 195 L 455 195 L 450 190 M 455 195 L 450 200" stroke="#10B981" strokeWidth="2" fill="none"/>
                </g>

                {/* Cartoon Character - Worker */}
                <g className="animate-wave">
                  <ellipse cx="380" cy="300" rx="25" ry="30" fill="#FED7AA" stroke="#F97316" strokeWidth="2"/>
                  {/* Head */}
                  ircle cx="380" cy="280" r="15" fill="#FDE68A" stroke="#F59E0B" strokeWidth="2"2"/>
                  {/* Eyes */}
                  ircle cx="375" cy="278" r="2" fill="#1#1F2937"/>
                  ircle cx="385" cy="278" r="2"2" fill="#1F2937"/>
                  {/* Smile */}
                  <path d="M 375 285 Q 380 288 385 285" stroke="#1F2937" strokeWidth="1.5" fill="none"/>
                  {/* Arm waving */}
                  <line x1="360" y1="290" x2="345" y2="275" stroke="#F97316" strokeWidth="3" strokeLinecap="round" className="animate-arm-wave"/>
                  {/* Hard hat */}
                  <ellipse cx="380" cy="268" rx="12" ry="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5"/>
                  <rect x="375" y="263" width="10" height="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" rx="1"/>
                </g>

                {/* Ground */}
                <rect x="0" y="350" width="500" height="50" fill="#E5E7EB"/>
                <line x1="0" y1="350" x2="500" y2="350" stroke="#9CA3AF" strokeWidth="2"/>
              </svg>
            </div>

            {/* Floating Status Cards */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 animate-fade-in-delayed border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Order Delivered</div>
                  <div className="text-sm font-bold text-gray-900">#ORD-1245</div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-12 -left-6 bg-white rounded-xl shadow-lg p-4 animate-fade-in-delayed-2 border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Stock Updated</div>
                  <div className="text-sm font-bold text-gray-900">+127 items</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - FIXED CENTERING */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-sm p-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600">
                Powerful features designed for modern warehouses
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group border border-blue-100">
                <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Tracking</h3>
                <p className="text-gray-600">
                  Monitor your inventory levels in real-time with instant updates and smart notifications.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group border border-purple-100">
                <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Analytics</h3>
                <p className="text-gray-600">
                  Get actionable insights with advanced analytics and predictive forecasting tools.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group border border-green-100">
                <div className="bg-green-600 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Automated Workflows</h3>
                <p className="text-gray-600">
                  Automate repetitive tasks and streamline your warehouse operations effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 shadow-xl">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Warehouse?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses streamlining their inventory management
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started for Free
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-50 border-t border-gray-200 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2025 StockMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
