import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ReceiptList() {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = () => {
    const savedReceipts = localStorage.getItem('receipts');
    if (savedReceipts) {
      setReceipts(JSON.parse(savedReceipts));
    } else {
      // Default receipts
      const defaultReceipts = [
        { id: 1, receiptNo: "RCP-001", supplier: "ABC Suppliers", date: "2025-11-22", status: "Done", items: 5, total: 1250.00 },
        { id: 2, receiptNo: "RCP-002", supplier: "XYZ Trading", date: "2025-11-21", status: "Ready", items: 3, total: 850.00 },
        { id: 3, receiptNo: "RCP-003", supplier: "Global Imports", date: "2025-11-20", status: "Waiting", items: 7, total: 2100.00 },
      ];
      setReceipts(defaultReceipts);
      localStorage.setItem('receipts', JSON.stringify(defaultReceipts));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      const updatedReceipts = receipts.filter(r => r.id !== id);
      setReceipts(updatedReceipts);
      localStorage.setItem('receipts', JSON.stringify(updatedReceipts));
    }
  };

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
          <h1 className="text-2xl font-bold">Receipts</h1>
          <div className="flex space-x-3">
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">← Back to Dashboard</Link>
            <Link
              to="/receipts/create"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + New Receipt
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {receipts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">No receipts found</p>
            <Link to="/receipts/create" className="text-blue-600 hover:underline">
              Create your first receipt
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receipt No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {receipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono font-medium text-blue-600">{receipt.receiptNo}</td>
                    <td className="px-6 py-4">{receipt.supplier}</td>
                    <td className="px-6 py-4 text-gray-600">{receipt.date}</td>
                    <td className="px-6 py-4 text-gray-600">{receipt.items}</td>
                    <td className="px-6 py-4 font-semibold">${receipt.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(receipt.status)}`}>
                        {receipt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Link to={`/receipts/${receipt.id}`} className="text-blue-600 hover:underline">View</Link>
                      <button onClick={() => handleDelete(receipt.id)} className="text-red-600 hover:underline">Delete</button>
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

export default ReceiptList;
