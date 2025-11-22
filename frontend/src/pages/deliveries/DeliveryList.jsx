import { useState } from "react";
import { Link } from "react-router-dom";

function DeliveryList() {
  const [deliveries] = useState([
    { id: 1, deliveryNo: "DEL-045", customer: "Tech Corp", date: "2025-11-22", status: "Ready", items: 4, total: 950.00 },
    { id: 2, deliveryNo: "DEL-046", customer: "BuildMax Inc", date: "2025-11-21", status: "Done", items: 6, total: 1500.00 },
    { id: 3, deliveryNo: "DEL-047", customer: "Metro Supplies", date: "2025-11-20", status: "Waiting", items: 3, total: 650.00 },
  ]);

  const getStatusColor = (status) => {
    const colors = {
      "Done": "bg-green-100 text-green-800",
      "Ready": "bg-blue-100 text-blue-800",
      "Waiting": "bg-yellow-100 text-yellow-800",
      "Draft": "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Deliveries</h1>
          <div className="flex space-x-3">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">← Back to Dashboard</Link>
            <Link
              to="/deliveries/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + New Delivery
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Delivery No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono font-medium text-purple-600">{delivery.deliveryNo}</td>
                  <td className="px-6 py-4">{delivery.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{delivery.date}</td>
                  <td className="px-6 py-4 text-gray-600">{delivery.items}</td>
                  <td className="px-6 py-4 font-semibold">${delivery.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(delivery.status)}`}>
                      {delivery.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/deliveries/${delivery.id}`} className="text-blue-600 hover:underline">View</Link>
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

export default DeliveryList;
