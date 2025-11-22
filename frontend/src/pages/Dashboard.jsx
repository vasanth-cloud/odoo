"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

function Dashboard() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  const [kpiData, setKpiData] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    pendingReceipts: 0,
    pendingDeliveries: 0,
    internalTransfers: 0,
    totalValue: 0,
    weeklyChange: 0,
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [lowStockProducts, setLowStockProducts] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      setTimeout(() => {
        setKpiData({
          totalProducts: 245,
          lowStock: 12,
          outOfStock: 3,
          pendingReceipts: 8,
          pendingDeliveries: 15,
          internalTransfers: 5,
          totalValue: 245680,
          weeklyChange: 12.5,
        })

        setRecentActivities([
          {
            id: 1,
            type: "Receipt",
            doc: "RCP-001",
            status: "Done",
            date: "2025-11-22",
            warehouse: "Main Warehouse",
            user: "John Doe",
          },
          {
            id: 2,
            type: "Delivery",
            doc: "DEL-045",
            status: "Ready",
            date: "2025-11-22",
            warehouse: "Main Warehouse",
            user: "Jane Smith",
          },
          {
            id: 3,
            type: "Internal Transfer",
            doc: "TRF-023",
            status: "Waiting",
            date: "2025-11-21",
            warehouse: "Warehouse 2",
            user: "Mike Johnson",
          },
          {
            id: 4,
            type: "Adjustment",
            doc: "ADJ-012",
            status: "Done",
            date: "2025-11-21",
            warehouse: "Main Warehouse",
            user: "Sarah Wilson",
          },
        ])

        setLowStockProducts([
          {
            id: 1,
            name: "Steel Rods",
            sku: "STL-001",
            stock: 5,
            reorderPoint: 20,
            category: "Raw Materials",
            trend: "down",
          },
          {
            id: 2,
            name: "Wooden Chairs",
            sku: "CHR-101",
            stock: 8,
            reorderPoint: 15,
            category: "Finished Goods",
            trend: "down",
          },
          {
            id: 3,
            name: "Plastic Sheets",
            sku: "PLS-045",
            stock: 3,
            reorderPoint: 10,
            category: "Raw Materials",
            trend: "critical",
          },
        ])

        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchDashboardData()
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  const getStatusColor = (status) => {
    const colors = {
      Done: "bg-emerald-100 text-emerald-700 border-emerald-200",
      Ready: "bg-blue-100 text-blue-700 border-blue-200",
      Waiting: "bg-amber-100 text-amber-700 border-amber-200",
      Draft: "bg-slate-100 text-slate-700 border-slate-200",
      Canceled: "bg-rose-100 text-rose-700 border-rose-200",
    }
    return colors[status] || "bg-slate-100 text-slate-700 border-slate-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="mt-6 text-slate-700 font-semibold animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modern Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:shadow-lg transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <span className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
                  StockMaster
                </span>
              </Link>

              <div className="hidden lg:flex items-center space-x-1">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <Link
                  to="/products"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-all duration-200"
                >
                  Products
                </Link>
                <Link
                  to="/receipts"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-all duration-200"
                >
                  Receipts
                </Link>
                <Link
                  to="/deliveries"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-all duration-200"
                >
                  Deliveries
                </Link>
                <Link
                  to="/transfers"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-800 rounded-lg transition-all duration-200"
                >
                  Transfers
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 group hover:scale-110"
              >
                <svg
                  className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>

              <button className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 relative hover:scale-110 group">
                <svg
                  className="w-5 h-5 group-hover:animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 hover:bg-slate-100 rounded-lg p-2 transition-all duration-200 hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm hover:shadow-md transition-shadow duration-200">
                    JD
                  </div>
                  <span className="text-sm font-medium text-slate-700 hidden md:block">John Doe</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 rounded-lg hover:from-red-600 hover:to-rose-700 hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Welcome back, John! 👋</h1>
            <p className="text-slate-600 mt-1">Here's what's happening with your warehouse today.</p>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to="/receipts/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 group"
            >
              <svg
                className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Receipt</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Products */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:border-blue-200 transition-all duration-300 border border-slate-100 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full group-hover:bg-emerald-100 transition-colors duration-200">
                +{kpiData.weeklyChange}%
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-200">
              {kpiData.totalProducts}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Total Products</p>
          </div>

          {/* Inventory Value */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:border-emerald-200 transition-all duration-300 border border-slate-100 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors duration-200">
              ${(kpiData.totalValue / 1000).toFixed(1)}K
            </h3>
            <p className="text-sm text-slate-600 mt-1">Inventory Value</p>
          </div>

          {/* Low Stock */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:border-amber-200 transition-all duration-300 border border-slate-100 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <span className="text-xs font-medium text-rose-600 bg-rose-50 px-2 py-1 rounded-full group-hover:bg-rose-100 transition-colors duration-200">
                {kpiData.outOfStock} critical
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors duration-200">
              {kpiData.lowStock}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Low Stock Items</p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:border-purple-200 transition-all duration-300 border border-slate-100 cursor-pointer group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-purple-600 transition-colors duration-200">
              {kpiData.pendingReceipts + kpiData.pendingDeliveries}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Pending Actions</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-800">Recent Activities</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveFilter("all")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-110 ${
                        activeFilter === "all"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveFilter("receipts")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-110 ${
                        activeFilter === "receipts"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Receipts
                    </button>
                    <button
                      onClick={() => setActiveFilter("deliveries")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 transform hover:scale-110 ${
                        activeFilter === "deliveries"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      Deliveries
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentActivities.map((activity) => (
                      <tr
                        key={activity.id}
                        className="hover:bg-blue-50 hover:shadow-md hover:scale-x-105 transition-all duration-150 cursor-pointer group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors duration-150">
                              {activity.type}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-mono text-blue-600 group-hover:text-blue-700 group-hover:font-bold transition-all duration-150">
                            {activity.doc}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-150">
                            {activity.user}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border transition-all duration-150 group-hover:shadow-md ${getStatusColor(activity.status)}`}
                          >
                            {activity.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-150">
                          {activity.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Low Stock Alert - Takes 1 column */}
          <div className="space-y-6">
            {/* Low Stock */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">Low Stock Alert</h2>
                <span className="w-8 h-8 bg-rose-100 hover:bg-rose-200 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </span>
              </div>

              <div className="space-y-3">
                {lowStockProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl border border-rose-100 hover:shadow-lg hover:scale-105 hover:border-rose-300 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 group-hover:text-rose-700 group-hover:scale-105 transition-all duration-200">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5 group-hover:text-slate-700 transition-colors duration-200">
                          SKU: {product.sku}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-rose-600 group-hover:text-rose-700 group-hover:scale-110 transition-all duration-200">
                          {product.stock}
                        </div>
                        <div className="text-xs text-slate-600">units left</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Reorder at: {product.reorderPoint}</span>
                      <span className="px-2 py-1 bg-white rounded-full text-slate-700 font-medium group-hover:bg-rose-100 transition-colors duration-200">
                        {product.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/products"
                className="mt-4 block text-center py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-105"
              >
                View All Products →
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg hover:shadow-2xl p-6 text-white transition-all duration-300 hover:scale-105">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/receipts/create"
                  className="flex items-center justify-between p-3 bg-white/20 hover:bg-white/40 rounded-xl transition-all duration-200 group hover:scale-110 origin-left"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                    New Receipt
                  </span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/deliveries/create"
                  className="flex items-center justify-between p-3 bg-white/20 hover:bg-white/40 rounded-xl transition-all duration-200 group hover:scale-110 origin-left"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                    New Delivery
                  </span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/transfers/create"
                  className="flex items-center justify-between p-3 bg-white/20 hover:bg-white/40 rounded-xl transition-all duration-200 group hover:scale-110 origin-left"
                >
                  <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                    New Transfer
                  </span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
