import { useState } from "react";
import { Link } from "react-router-dom";

function DeliveryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [deliveries] = useState([
    { id: 1, deliveryNo: "DEL-045", customer: "Tech Corp", customerAddress: "123 Tech Street", date: "2025-11-22", status: "SHIPPED", items: 4, total: 950.00, trackingNo: "TRK-001" },
    { id: 2, deliveryNo: "DEL-046", customer: "BuildMax Inc", customerAddress: "456 Build Ave", date: "2025-11-21", status: "DELIVERED", items: 6, total: 1500.00, trackingNo: "TRK-002" },
    { id: 3, deliveryNo: "DEL-047", customer: "Metro Supplies", customerAddress: "789 Metro Blvd", date: "2025-11-20", status: "PENDING", items: 3, total: 650.00, trackingNo: "TRK-003" },
    { id: 4, deliveryNo: "DEL-048", customer: "Alpha Industries", customerAddress: "321 Alpha Road", date: "2025-11-19", status: "APPROVED", items: 8, total: 2100.00, trackingNo: "TRK-004" },
    { id: 5, deliveryNo: "DEL-049", customer: "Beta Solutions", customerAddress: "654 Beta Lane", date: "2025-11-18", status: "DRAFT", items: 2, total: 380.00, trackingNo: "TRK-005" },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-slate-100 text-slate-700 border-slate-200",
      "PENDING": "bg-amber-100 text-amber-700 border-amber-200",
      "APPROVED": "bg-blue-100 text-blue-700 border-blue-200",
      "SHIPPED": "bg-purple-100 text-purple-700 border-purple-200",
      "DELIVERED": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "CANCELLED": "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[status] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "DRAFT": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      "PENDING": "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      "APPROVED": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      "SHIPPED": "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
      "DELIVERED": "M5 13l4 4L19 7",
      "CANCELLED": "M6 18L18 6M6 6l12 12",
    };
    return icons[status] || icons.DRAFT;
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    const matchesSearch = delivery.deliveryNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || delivery.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: deliveries.length,
    DRAFT: deliveries.filter(d => d.status === "DRAFT").length,
    PENDING: deliveries.filter(d => d.status === "PENDING").length,
    SHIPPED: deliveries.filter(d => d.status === "SHIPPED").length,
    DELIVERED: deliveries.filter(d => d.status === "DELIVERED").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Delivery Management</h1>
                <p className="text-sm text-slate-600">Track and manage all deliveries</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export</span>
              </button>
              <Link
                to="/deliveries/create"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Delivery</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <button
            onClick={() => setFilterStatus("all")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "all"
                ? "bg-purple-50 border-purple-500 shadow-md"
                : "bg-white border-slate-200 hover:border-purple-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">{statusCounts.all}</p>
              <p className="text-sm text-slate-600 mt-1">Total Deliveries</p>
            </div>
          </button>

          <button
            onClick={() => setFilterStatus("PENDING")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "PENDING"
                ? "bg-amber-50 border-amber-500 shadow-md"
                : "bg-white border-slate-200 hover:border-amber-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{statusCounts.PENDING}</p>
              <p className="text-sm text-slate-600 mt-1">Pending</p>
            </div>
          </button>

          <button
            onClick={() => setFilterStatus("SHIPPED")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "SHIPPED"
                ? "bg-purple-50 border-purple-500 shadow-md"
                : "bg-white border-slate-200 hover:border-purple-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">{statusCounts.SHIPPED}</p>
              <p className="text-sm text-slate-600 mt-1">Shipped</p>
            </div>
          </button>

          <button
            onClick={() => setFilterStatus("DELIVERED")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "DELIVERED"
                ? "bg-emerald-50 border-emerald-500 shadow-md"
                : "bg-white border-slate-200 hover:border-emerald-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{statusCounts.DELIVERED}</p>
              <p className="text-sm text-slate-600 mt-1">Delivered</p>
            </div>
          </button>

          <button
            onClick={() => setFilterStatus("DRAFT")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "DRAFT"
                ? "bg-slate-50 border-slate-500 shadow-md"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-600">{statusCounts.DRAFT}</p>
              <p className="text-sm text-slate-600 mt-1">Draft</p>
            </div>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by delivery number or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 border-2 border-slate-200 rounded-lg hover:border-purple-300 transition-colors duration-200 flex items-center space-x-2">
                <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-slate-700">Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b-2 border-purple-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Delivery #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Tracking</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDeliveries.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                          </svg>
                        </div>
                        <p className="text-slate-600 font-medium">No deliveries found</p>
                        <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 font-mono">{delivery.deliveryNo}</p>
                            <p className="text-xs text-slate-500">ID: {delivery.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-800">{delivery.customer}</p>
                          <p className="text-xs text-slate-500">{delivery.customerAddress}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-mono">
                          {delivery.trackingNo}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{delivery.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-slate-800">{delivery.items}</span>
                        <span className="text-slate-500 text-sm ml-1">items</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-lg font-bold text-slate-800">${delivery.total.toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 inline-flex items-center space-x-1 ${getStatusColor(delivery.status)}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getStatusIcon(delivery.status)} />
                            </svg>
                            <span>{delivery.status}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/deliveries/${delivery.id}`}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                            title="View Details"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
                          <button
                            className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                            title="Track Delivery"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryList;
