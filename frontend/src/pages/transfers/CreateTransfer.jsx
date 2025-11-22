import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateTransfer() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    transferNumber: "",
    transferDate: "",
    fromLocation: "",
    toLocation: "",
    status: "DRAFT",
    notes: ""
  });

  const [items, setItems] = useState([
    { productId: "", quantity: "" }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locations = [
    "Warehouse A",
    "Warehouse B",
    "Warehouse C",
    "Production Floor",
    "Storage Unit 1",
    "Storage Unit 2",
    "Retail Store"
  ];

  const statusOptions = ["DRAFT", "PENDING", "APPROVED", "IN_TRANSIT", "COMPLETED", "CANCELLED"];

  useEffect(() => {
    loadProducts();
    generateTransferNumber();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setProducts(data.filter(p => p.active));
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const generateTransferNumber = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/transfers', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const transfers = await response.json();
        const nextNumber = transfers.length + 1;
        setFormData(prev => ({
          ...prev,
          transferNumber: `TRF-${String(nextNumber).padStart(3, '0')}`
        }));
      }
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        transferNumber: 'TRF-001'
      }));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { productId: "", quantity: "" }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.transferNumber) newErrors.transferNumber = "Transfer number is required";
    if (!formData.transferDate) newErrors.transferDate = "Transfer date is required";
    if (!formData.fromLocation) newErrors.fromLocation = "From location is required";
    if (!formData.toLocation) newErrors.toLocation = "To location is required";
    if (formData.fromLocation === formData.toLocation) {
      newErrors.toLocation = "To location must be different from From location";
    }
    
    const hasEmptyItems = items.some(item => !item.productId || !item.quantity);
    if (hasEmptyItems) newErrors.items = "All item fields must be filled";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Prepare data in exact backend format
    const transferData = {
      transferNumber: formData.transferNumber,
      transferDate: new Date(formData.transferDate).toISOString(),
      fromLocation: formData.fromLocation,
      toLocation: formData.toLocation,
      status: formData.status,
      notes: formData.notes,
      items: items.map(item => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity)
      }))
    };

    try {
      const response = await fetch('http://your-backend-url/api/transfers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(transferData)
      });

      if (!response.ok) {
        throw new Error('Failed to create transfer');
      }

      alert("Transfer created successfully!");
      navigate("/transfers");
      
    } catch (error) {
      console.error("Error creating transfer:", error);
      alert("Error creating transfer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Create Internal Transfer</h1>
          <p className="text-gray-600 text-sm">Move stock between warehouses or locations</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transfer Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Transfer Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Transfer Number *</label>
                  <input
                    type="text"
                    name="transferNumber"
                    value={formData.transferNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Transfer Date *</label>
                  <input
                    type="datetime-local"
                    name="transferDate"
                    value={formData.transferDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                      errors.transferDate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.transferDate && <p className="text-red-500 text-sm mt-1">{errors.transferDate}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">From Location *</label>
                  <select
                    name="fromLocation"
                    value={formData.fromLocation}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                      errors.fromLocation ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select Source Location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.fromLocation && <p className="text-red-500 text-sm mt-1">{errors.fromLocation}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">To Location *</label>
                  <select
                    name="toLocation"
                    value={formData.toLocation}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                      errors.toLocation ? 'border-red-500' : ''
                    }`}
                  >
                    <option value="">Select Destination Location</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {errors.toLocation && <p className="text-red-500 text-sm mt-1">{errors.toLocation}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Status *</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Items to Transfer</h3>
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  + Add Item
                </button>
              </div>

              {errors.items && <p className="text-red-500 text-sm mb-2">{errors.items}</p>}

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-end bg-gray-50 p-3 rounded">
                    <div className="col-span-9">
                      <label className="block text-gray-700 text-sm mb-1">Product *</label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      >
                        <option value="">Select Product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.code} - {product.name} (Available: {product.quantity})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm mb-1">Quantity *</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        min="1"
                        placeholder="0"
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
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isSubmitting ? "Creating..." : "Create Transfer"}
              </button>
              <Link
                to="/transfers"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* JSON Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">API Payload Preview:</p>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{JSON.stringify({
  transferNumber: formData.transferNumber,
  transferDate: formData.transferDate ? new Date(formData.transferDate).toISOString() : "",
  fromLocation: formData.fromLocation,
  toLocation: formData.toLocation,
  status: formData.status,
  notes: formData.notes,
  items: items.map(item => ({
    productId: parseInt(item.productId) || 0,
    quantity: parseInt(item.quantity) || 0
  }))
}, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTransfer;
