import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function TransferDetails() {
  const { id } = useParams();
  const [transfer, setTransfer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransfer();
  }, [id]);

  const loadTransfer = async () => {
    try {
      const response = await fetch(`http://your-backend-url/api/transfers/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTransfer(data);
      }
    } catch (error) {
      console.error("Error loading transfer:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-gray-100 text-gray-800",
      "PENDING": "bg-yellow-100 text-yellow-800",
      "APPROVED": "bg-blue-100 text-blue-800",
      "IN_TRANSIT": "bg-purple-100 text-purple-800",
      "COMPLETED": "bg-green-100 text-green-800",
      "CANCELLED": "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading transfer...</p>
      </div>
    );
  }

  if (!transfer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Transfer not found</p>
          <Link to="/transfers" className="text-blue-600 hover:underline">
            Back to Transfers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Transfer Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{transfer.transferNumber}</h2>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">{transfer.fromLocation}</span> 
                <span className="mx-2">→</span> 
                <span className="font-semibold">{transfer.toLocation}</span>
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(transfer.status)}`}>
              {transfer.status}
            </span>
          </div>

          {/* Transfer Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Transfer Date</p>
              <p className="font-semibold">{new Date(transfer.transferDate).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Items</p>
              <p className="font-semibold">{transfer.items?.length || 0} products</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Items Transferred</h3>
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Product ID</th>
                  <th className="px-4 py-2 text-right text-sm">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transfer.items && transfer.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">Product #{item.productId}</td>
                    <td className="px-4 py-2 text-right font-semibold">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {transfer.notes && (
            <div>
              <p className="text-gray-500 text-sm mb-1">Notes</p>
              <p className="text-gray-700">{transfer.notes}</p>
            </div>
          )}

          <Link to="/transfers" className="inline-block bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Back to Transfers
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TransferDetails;
