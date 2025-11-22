import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateAdjustment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    warehouse: "",
    reason: "",
    adjustmentDate: "",
    notes: ""
  });

  const [items, setItems] = useState([
    { product: "", recordedQty: "", countedQty: "", difference: 0 }
  ]);

  const reasons = [
    "Physical Count",
    "Damaged Items",
    "Lost in Transit",
    "Expired Products",
    "Theft",
    "Counting Error",
    "Other"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    // Calculate difference automatically
    if (field === "recordedQty" || field === "countedQty") {
      const recorded = parseFloat(newItems[index].recordedQty) || 0;
      const counted = parseFloat(newItems[index].countedQty) || 0;
      newItems[index].difference = counted - recorded;
    }
    
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { product: "", recordedQty: "", countedQty: "", difference: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adjustment created:", { ...formData, items });
    navigate("/adjustments");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Create Inventory Adjustment</h1>
          <p className="text-gray-600 text-sm">Fix stock discrepancies between recorded and physical count</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Adjustment Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Warehouse *</label>
                  <select
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Warehouse</option>
                    <option value="Main Warehouse">Main Warehouse</option>
                    <option value="Warehouse 2">Warehouse 2</option>
                    <option value="Storage Unit A">Storage Unit A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Reason *</label>
                  <select
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  >
                    <option value="">Select Reason</option>
                    {reasons.map((reason) => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 mb-1">Adjustment Date *</label>
                  <input
                    type="date"
                    name="adjustmentDate"
                    value={formData.adjustmentDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Products to Adjust</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  + Add Product
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-5">
                        <label className="block text-gray-700 text-sm mb-1">Product</label>
                        <input
                          type="text"
                          value={item.product}
                          onChange={(e) => handleItemChange(index, "product", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                          placeholder="Enter product name or SKU"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Recorded Qty</label>
                        <input
                          type="number"
                          value={item.recordedQty}
                          onChange={(e) => handleItemChange(index, "recordedQty", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Counted Qty</label>
                        <input
                          type="number"
                          value={item.countedQty}
                          onChange={(e) => handleItemChange(index, "countedQty", e.target.value)}
                          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-gray-700 text-sm mb-1">Difference</label>
                        <input
                          type="text"
                          value={item.difference > 0 ? `+${item.difference}` : item.difference}
                          readOnly
                          className={`w-full px-4 py-2 border rounded-lg font-semibold ${
                            item.difference > 0 ? 'text-green-600 bg-green-50' : 
                            item.difference < 0 ? 'text-red-600 bg-red-50' : 
                            'text-gray-600 bg-gray-50'
                          }`}
                        />
                      </div>

                      <div className="col-span-1">
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Add any additional notes about this adjustment..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Create Adjustment
              </button>
              <Link
                to="/adjustments"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateAdjustment;
