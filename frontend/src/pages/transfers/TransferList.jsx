import { useState } from "react";
import { Link } from "react-router-dom";

function TransferList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [transfers] = useState([
    { id: 1, transferNo: "TRF-023", fromWarehouse: "Main Warehouse", toWarehouse: "Warehouse 2", date: "2025-11-22", status: "PENDING", items: 5, user: "Mike Johnson" },
    { id: 2, transferNo: "TRF-024", fromWarehouse: "Warehouse 2", toWarehouse: "Main Warehouse", date: "2025-11-21", status: "COMPLETED", items: 8, user: "Sarah Wilson" },
    { id: 3, transferNo: "TRF-025", fromWarehouse: "Main Warehouse", toWarehouse: "Warehouse 3", date: "2025-11-20", status: "IN_TRANSIT", items: 3, user: "John Doe" },
    { id: 4, transferNo: "TRF-026", fromWarehouse: "Warehouse 3", toWarehouse: "Warehouse 2", date: "2025-11-19", status: "DRAFT", items: 6, user: "Jane Smith" },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-slate-100 text-slate-700 border-slate-200",
      "PENDING": "bg-amber-100 text-amber-700 border-amber-200",
      "IN_TRANSIT": "bg-blue-100 text-blue-700 border-blue-200",
      "COMPLETED": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "CANCELLED": "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[status] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "DRAFT": "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      "PENDING": "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      "IN_TRANSIT": "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
      "COMPLETED": "M5 13l4 4L19 7",
      "CANCELLED": "M6 18L18 6M6 6l12 12",
    };
    return icons[status] || icons.DRAFT;
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.transferNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromWarehouse.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toWarehouse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || transfer.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: transfers.length,
    DRAFT: transfers.filter(t => t.status === "DRAFT").length,
    PENDING: transfers.filter(t => t.status === "PENDING").length,
    IN_TRANSIT: transfers.filter(t => t.status === "IN_TRANSIT").length,
    COMPLETED: transfers.filter(t => t.status === "COMPLETED").length,
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
                <h1 className="text-2xl font-bold text-slate-800">Internal Transfers</h1>
                <p className="text-sm text-slate-600">Manage warehouse-to-warehouse transfers</p>
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
                to="/transfers/create"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Transfer</span>
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
                ? "bg-indigo-50 border-indigo-500 shadow-md"
                : "bg-white border-slate-200 hover:border-indigo-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">{statusCounts.all}</p>
              <p className="text-sm text-slate-600 mt-1">Total Transfers</p>
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
            onClick={() => setFilterStatus("IN_TRANSIT")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "IN_TRANSIT"
                ? "bg-blue-50 border-blue-500 shadow-md"
                : "bg-white border-slate-200 hover:border-blue-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{statusCounts.IN_TRANSIT}</p>
              <p className="text-sm text-slate-600 mt-1">In Transit</p>
            </div>
          </button>

          <button
            onClick={() => setFilterStatus("COMPLETED")}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              filterStatus === "COMPLETED"
                ? "bg-emerald-50 border-emerald-500 shadow-md"
                : "bg-white border-slate-200 hover:border-emerald-300"
            }`}
          >
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{statusCounts.COMPLETED}</p>
              <p className="text-sm text-slate-600 mt-1">Completed</p>
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

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search transfers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            />
          </div>
        </div>

        {/* Transfers Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-indigo-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Transfer #</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">From</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">To</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransfers.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-3">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <p className="text-slate-600 font-medium">No transfers found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredTransfers.map((transfer) => (
                    <tr key={transfer.id} className="hover:bg-slate-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800 font-mono">{transfer.transferNo}</p>
                            <p className="text-xs text-slate-500">ID: {transfer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                          <span className="text-sm font-medium text-slate-700">{transfer.fromWarehouse}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                          <span className="text-sm font-medium text-slate-700">{transfer.toWarehouse}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{transfer.user}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-slate-600">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm">{transfer.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold text-slate-800">{transfer.items}</span>
                        <span className="text-slate-500 text-sm ml-1">items</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 inline-flex items-center space-x-1 ${getStatusColor(transfer.status)}`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getStatusIcon(transfer.status)} />
                            </svg>
                            <span>{transfer.status.replace('_', ' ')}</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <Link
                            to={`/transfers/${transfer.id}`}
                            className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
                            title="View Details"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </Link>
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

export default TransferList;
