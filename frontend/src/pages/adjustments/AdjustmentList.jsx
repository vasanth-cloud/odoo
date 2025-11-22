import { useState } from "react";
import { Link } from "react-router-dom";

function AdjustmentList() {
  const [adjustments] = useState([
    { 
      id: 1, 
      adjustmentNo: "ADJ-012", 
      reason: "Physical Count", 
      warehouse: "Main Warehouse", 
      date: "2025-11-22", 
      status: "Done", 
      items: 4 
    },
    { 
      id: 2, 
      adjustmentNo: "ADJ-013", 
      reason: "Damaged Items", 
      warehouse: "Warehouse 2", 
      date: "2025-11-21", 
      status: "Done", 
      items: 2 
    },
    { 
      id: 3, 
      adjustmentNo: "ADJ-014", 
      reason: "Lost in Transit", 
      warehouse: "Main Warehouse", 
      date: "2025-11-20", 
      status: "Draft", 
      items: 1 
    },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      "Done": "bg-green-100 text-green-800",
      "Draft": "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Inventory Adjustments</h1>
          <div className="flex space-x-3">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">← Back to Dashboard</Link>
            <Link
              to="/adjustments/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + New Adjustment
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Adjustment No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {adjustments.map((adjustment) => (
                <tr key={adjustment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-medium text-orange-600">{adjustment.adjustmentNo}</td>
                  <td className="px-6 py-4">{adjustment.reason}</td>
                  <td className="px-6 py-4 text-gray-600">{adjustment.warehouse}</td>
                  <td className="px-6 py-4 text-gray-600">{adjustment.date}</td>
                  <td className="px-6 py-4 text-gray-600">{adjustment.items}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(adjustment.status)}`}>
                      {adjustment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/adjustments/${adjustment.id}`} className="text-blue-600 hover:underline">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdjustmentList;
