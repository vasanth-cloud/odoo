import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  
  // State for dashboard data
  const [kpiData, setKpiData] = useState({
    totalProducts: 0,
    lowStock: 0,
    outOfStock: 0,
    pendingReceipts: 0,
    pendingDeliveries: 0,
    internalTransfers: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Fetch dashboard data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Replace these with actual API calls
      
      // Example API call (replace with your backend)
      // const kpiResponse = await fetch('/api/dashboard/kpis');
      // const kpiResult = await kpiResponse.json();
      // setKpiData(kpiResult);

      // For now, simulate API call with mock data
      setTimeout(() => {
        setKpiData({
          totalProducts: 245,
          lowStock: 12,
          outOfStock: 3,
          pendingReceipts: 8,
          pendingDeliveries: 15,
          internalTransfers: 5
        });

        setRecentActivities([
          { id: 1, type: "Receipt", doc: "RCP-001", status: "Done", date: "2025-11-22", warehouse: "Main Warehouse" },
          { id: 2, type: "Delivery", doc: "DEL-045", status: "Ready", date: "2025-11-22", warehouse: "Main Warehouse" },
          { id: 3, type: "Internal Transfer", doc: "TRF-023", status: "Waiting", date: "2025-11-21", warehouse: "Warehouse 2" },
          { id: 4, type: "Adjustment", doc: "ADJ-012", status: "Done", date: "2025-11-21", warehouse: "Main Warehouse" },
        ]);

        setLowStockProducts([
          { id: 1, name: "Steel Rods", sku: "STL-001", stock: 5, reorderPoint: 20, category: "Raw Materials" },
          { id: 2, name: "Wooden Chairs", sku: "CHR-101", stock: 8, reorderPoint: 15, category: "Finished Goods" },
          { id: 3, name: "Plastic Sheets", sku: "PLS-045", stock: 3, reorderPoint: 10, category: "Raw Materials" },
        ]);

        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  // Refresh dashboard data
  const handleRefresh = () => {
    fetchDashboardData();
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const getStatusColor = (status) => {
    const colors = {
      "Done": "bg-green-100 text-green-800",
      "Ready": "bg-blue-100 text-blue-800",
      "Waiting": "bg-yellow-100 text-yellow-800",
      "Draft": "bg-gray-100 text-gray-800",
      "Canceled": "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-blue-600">StockMaster</h1>
              <div className="hidden md:flex space-x-6">
                <Link to="/dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
                <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
                <Link to="/receipts" className="text-gray-600 hover:text-blue-600">Receipts</Link>
                <Link to="/deliveries" className="text-gray-600 hover:text-blue-600">Deliveries</Link>
                <Link to="/transfers" className="text-gray-600 hover:text-blue-600">Transfers</Link>
                <Link to="/adjustments" className="text-gray-600 hover:text-blue-600">Adjustments</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="text-gray-600 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100"
                title="Refresh Dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              
              <Link to="/settings" className="text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Inventory Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your inventory overview.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Total Products</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.totalProducts}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Low Stock Items */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Low Stock Items</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.lowStock}</p>
                <p className="text-xs text-red-600 mt-1">{kpiData.outOfStock} out of stock</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Receipts */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Pending Receipts</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.pendingReceipts}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending Deliveries */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Pending Deliveries</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.pendingDeliveries}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Internal Transfers */}
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm font-semibold uppercase">Internal Transfers</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{kpiData.internalTransfers}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md p-6 text-white">
            <p className="text-sm font-semibold uppercase opacity-90">Quick Actions</p>
            <div className="mt-4 space-y-2">
              <Link to="/receipts/create" className="block bg-white/20 hover:bg-white/30 rounded px-3 py-2 text-sm transition">
                + New Receipt
              </Link>
              <Link to="/deliveries/create" className="block bg-white/20 hover:bg-white/30 rounded px-3 py-2 text-sm transition">
                + New Delivery
              </Link>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
              
              {/* Filters */}
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-3 py-1 rounded text-sm ${activeFilter === "all" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter("receipts")}
                  className={`px-3 py-1 rounded text-sm ${activeFilter === "receipts" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  Receipts
                </button>
                <button
                  onClick={() => setActiveFilter("deliveries")}
                  className={`px-3 py-1 rounded text-sm ${activeFilter === "deliveries" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  Deliveries
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{activity.type}</td>
                      <td className="px-4 py-3 text-sm font-mono text-blue-600">{activity.doc}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{activity.date}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{activity.warehouse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Low Stock Alert</h3>
            <div className="space-y-4">
              {lowStockProducts.map((product) => (
                <div key={product.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                    </div>
                    <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Reorder: {product.reorderPoint}</span>
                    <span className="text-gray-500">{product.category}</span>
                  </div>
                </div>
              ))}
              <Link to="/products" className="block text-center text-blue-600 hover:text-blue-700 font-semibold text-sm mt-4">
                View All Products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
