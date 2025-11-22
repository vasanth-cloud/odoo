import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function DeliveryDetails() {
  const { id } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const statusOptions = ["DRAFT", "PENDING", "APPROVED", "SHIPPED", "DELIVERED", "CANCELLED"];

  useEffect(() => {
    loadDelivery();
  }, [id]);

  const loadDelivery = async () => {
    try {
      const response = await fetch(`http://your-backend-url/api/deliveries/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDelivery(data);
      }
    } catch (error) {
      console.error("Error loading delivery:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!window.confirm(`Change status to ${newStatus}?`)) return;

    setUpdatingStatus(true);
    try {
      // API: PUT /api/deliveries/{id}/status?status={status}
      const response = await fetch(
        `http://your-backend-url/api/deliveries/${id}/status?status=${newStatus}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.ok) {
        alert("Status updated successfully!");
        loadDelivery(); // Reload delivery
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-gray-100 text-gray-800",
      "PENDING": "bg-yellow-100 text-yellow-800",
      "APPROVED": "bg-blue-100 text-blue-800",
      "SHIPPED": "bg-purple-100 text-purple-800",
      "DELIVERED": "bg-green-100 text-green-800",
      "CANCELLED": "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading delivery...</p>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Delivery not found</p>
          <Link to="/deliveries" className="text-blue-600 hover:underline">
            Back to Deliveries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Delivery Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{delivery.deliveryNumber}</h2>
              <p className="text-gray-600">{delivery.customer}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(delivery.status)}`}>
              {delivery.status}
            </span>
          </div>

          {/* Delivery Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Delivery Date</p>
              <p className="font-semibold">{new Date(delivery.deliveryDate).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Reference Number</p>
              <p className="font-semibold">{delivery.referenceNumber || 'N/A'}</p>
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Items</h3>
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Product ID</th>
                  <th className="px-4 py-2 text-right text-sm">Quantity</th>
                  <th className="px-4 py-2 text-right text-sm">Unit Price</th>
                  <th className="px-4 py-2 text-right text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {delivery.items && delivery.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">Product #{item.productId}</td>
                    <td className="px-4 py-2 text-right">{item.quantity}</td>
                    <td className="px-4 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                    <td className="px-4 py-2 text-right font-semibold">
                      ${(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t-2 border-gray-300 font-bold">
                  <td colSpan="3" className="px-4 py-2 text-right">Total:</td>
                  <td className="px-4 py-2 text-right">
                    ${delivery.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {delivery.notes && (
            <div>
              <p className="text-gray-500 text-sm mb-1">Notes</p>
              <p className="text-gray-700">{delivery.notes}</p>
            </div>
          )}

          {/* Status Update Actions */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-lg mb-3">Update Status</h3>
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={updatingStatus || delivery.status === status}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    delivery.status === status
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <Link to="/deliveries" className="inline-block bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Back to Deliveries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetails;
