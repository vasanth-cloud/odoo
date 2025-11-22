import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TransferList() {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransfers();
  }, []);

  const loadTransfers = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/transfers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTransfers(data);
      }
    } catch (error) {
      console.error("Error loading transfers:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-gray-100 text-gray-800",
      "PENDING": "bg-yellow-100 text-yellow-800",
      "APPROVED": "bg-blue-100 text-blue-800",
      "COMPLETED": "bg-green-100 text-green-800",
      "CANCELLED": "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading transfers...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Internal Transfers</h1>
          <div className="flex space-x-3">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">← Back to Dashboard</Link>
            <Link
              to="/transfers/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + New Transfer
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {transfers.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No transfers found</p>
            <Link to="/transfers/create" className="text-blue-600 hover:underline">
              Create your first transfer
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transfer No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transfers.map((transfer) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium text-indigo-600">{transfer.transferNumber}</td>
                    <td className="px-6 py-4">{transfer.fromLocation}</td>
                    <td className="px-6 py-4">{transfer.toLocation}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(transfer.transferDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-gray-600">{transfer.items?.length || 0}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(transfer.status)}`}>
                        {transfer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/transfers/${transfer.id}`} className="text-blue-600 hover:underline">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransferList;
