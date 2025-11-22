import { useParams, Link } from "react-router-dom";

function AdjustmentDetails() {
  const { id } = useParams();
  
  const adjustment = {
    id,
    adjustmentNo: "ADJ-012",
    reason: "Physical Count",
    warehouse: "Main Warehouse",
    date: "2025-11-22",
    status: "Done",
    notes: "Annual physical inventory count - discrepancies found",
    items: [
      { product: "Steel Rods", sku: "STL-001", recorded: 150, counted: 147, difference: -3 },
      { product: "Wooden Planks", sku: "WDP-020", recorded: 80, counted: 85, difference: +5 },
      { product: "Bolts", sku: "BLT-010", recorded: 500, counted: 495, difference: -5 },
      { product: "Paint Cans", sku: "PNT-050", recorded: 30, counted: 30, difference: 0 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Adjustment Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="flex justify-between items-start border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{adjustment.adjustmentNo}</h2>
              <p className="text-gray-600 mt-1">{adjustment.reason}</p>
            </div>
            <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
              {adjustment.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Adjustment Date</p>
              <p className="font-semibold">{adjustment.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Warehouse</p>
              <p className="font-semibold">{adjustment.warehouse}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Adjusted Items</h3>
            <table className="w-full border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm">Product</th>
                  <th className="px-4 py-2 text-left text-sm">SKU</th>
                  <th className="px-4 py-2 text-right text-sm">Recorded</th>
                  <th className="px-4 py-2 text-right text-sm">Counted</th>
                  <th className="px-4 py-2 text-right text-sm">Difference</th>
                </tr>
              </thead>
              <tbody>
                {adjustment.items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.product}</td>
                    <td className="px-4 py-2 font-mono text-sm text-gray-600">{item.sku}</td>
                    <td className="px-4 py-2 text-right">{item.recorded}</td>
                    <td className="px-4 py-2 text-right">{item.counted}</td>
                    <td className={`px-4 py-2 text-right font-semibold ${
                      item.difference > 0 ? 'text-green-600' : 
                      item.difference < 0 ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {item.difference > 0 ? `+${item.difference}` : item.difference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {adjustment.notes && (
            <div>
              <p className="text-gray-500 text-sm mb-1">Notes</p>
              <p className="text-gray-700">{adjustment.notes}</p>
            </div>
          )}

          <Link to="/adjustments" className="inline-block bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
            Back to Adjustments
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdjustmentDetails;
