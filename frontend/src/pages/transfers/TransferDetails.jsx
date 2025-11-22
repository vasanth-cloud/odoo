import { useParams, Link } from "react-router-dom";

function TransferDetails() {
  const { id } = useParams();
  
  const transfer = {
    id,
    transferNo: "TRF-001",
    from: "Main Warehouse",
    to: "Production Floor",
    date: "2025-11-22",
    status: "Done",
    notes: "Urgent transfer for production line",
    items: [
      { product: "Steel Rods", sku: "STL-001", quantity: 50 },
      { product: "Bolts", sku: "BLT-010", quantity: 200 },
      { product: "Washers", sku: "WSH-005", quantity: 300 },
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      "Done": "bg-green-100 text-green-800",
      "Ready": "bg-blue-100 text-blue-800",
      "Waiting": "bg-yellow-100 text-yellow-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Transfer Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{transfer.transferNo}</h2>
              <p className="text-gray-600 mt-1">
                <span className="font-semibold">{transfer.from}</span> 
                <span className="mx-2">→</span> 
                <span className="font-semibold">{transfer.to}</span>
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(transfer.status)}`}>
              {transfer.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Transfer Date</p>
              <p className="font-semibold">{transfer.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Items</p>
              <p className="font-semibold">{transfer.items.length} products</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Items Transferred</h3>
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Product</th>
                  <th className="px-4 py-2 text-left text-sm">SKU</th>
                  <th className="px-4 py-2 text-right text-sm">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {transfer.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.product}</td>
                    <td className="px-4 py-2 font-mono text-sm text-gray-600">{item.sku}</td>
                    <td className="px-4 py-2 text-right font-semibold">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
