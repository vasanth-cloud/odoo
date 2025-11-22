import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateReceipt() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  
  const [formData, setFormData] = useState({
    receiptNumber: "",
    receiptDate: "",
    supplier: "",
    referenceNumber: "",
    status: "DRAFT",
    notes: ""
  });

  const [items, setItems] = useState([
    { productId: "", quantity: "", unitPrice: "" }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = ["DRAFT", "PENDING", "APPROVED", "RECEIVED", "CANCELLED"];

  useEffect(() => {
    loadProducts();
    generateReceiptNumber();
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

  const generateReceiptNumber = async () => {
    try {
      const response = await fetch('http://your-backend-url/api/receipts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const receipts = await response.json();
        const nextNumber = receipts.length + 1;
        setFormData(prev => ({
          ...prev,
          receiptNumber: `REC-${String(nextNumber).padStart(3, '0')}`
        }));
      }
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        receiptNumber: 'REC-001'
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
    setItems([...items, { productId: "", quantity: "", unitPrice: "" }]);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.receiptNumber) newErrors.receiptNumber = "Receipt number is required";
    if (!formData.receiptDate) newErrors.receiptDate = "Receipt date is required";
    if (!formData.supplier.trim()) newErrors.supplier = "Supplier is required";
    
    const hasEmptyItems = items.some(item => !item.productId || !item.quantity || !item.unitPrice);
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
    const receiptData = {
      receiptNumber: formData.receiptNumber,
      receiptDate: new Date(formData.receiptDate).toISOString(),
      supplier: formData.supplier,
      referenceNumber: formData.referenceNumber,
      status: formData.status,
      notes: formData.notes,
      items: items.map(item => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity),
        unitPrice: parseFloat(item.unitPrice)
      }))
    };

    try {
      const response = await fetch('http://your-backend-url/api/receipts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(receiptData)
      });

      if (!response.ok) {
        throw new Error('Failed to create receipt');
      }

      const result = await response.json();
      alert("Receipt created successfully!");
      navigate("/receipts");
      
    } catch (error) {
      console.error("Error creating receipt:", error);
      alert("Error creating receipt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Create New Receipt</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Receipt Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Receipt Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Receipt Number *</label>
                  <input
                    type="text"
                    name="receiptNumber"
                    value={formData.receiptNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50 ${
                      errors.receiptNumber ? 'border-red-500' : ''
                    }`}
                    readOnly
                  />
                  {errors.receiptNumber && <p className="text-red-500 text-sm mt-1">{errors.receiptNumber}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Receipt Date *</label>
                  <input
                    type="datetime-local"
                    name="receiptDate"
                    value={formData.receiptDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                      errors.receiptDate ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.receiptDate && <p className="text-red-500 text-sm mt-1">{errors.receiptDate}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Supplier *</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                      errors.supplier ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter supplier name"
                  />
                  {errors.supplier && <p className="text-red-500 text-sm mt-1">{errors.supplier}</p>}
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Reference Number</label>
                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Optional reference"
                  />
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
                <h3 className="text-lg font-semibold">Items</h3>
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
                    <div className="col-span-5">
                      <label className="block text-gray-700 text-sm mb-1">Product *</label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleItemChange(index, "productId", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      >
                        <option value="">Select Product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.code} - {product.name}
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
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm mb-1">Unit Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        min="0"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-gray-700 text-sm mb-1">Total</label>
                      <input
                        type="text"
                        value={`$${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}`}
                        readOnly
                        className="w-full px-4 py-2 border rounded-lg bg-gray-100 font-semibold"
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
                {isSubmitting ? "Creating..." : "Create Receipt"}
              </button>
              <Link
                to="/receipts"
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
  receiptNumber: formData.receiptNumber,
  receiptDate: formData.receiptDate ? new Date(formData.receiptDate).toISOString() : "",
  supplier: formData.supplier,
  referenceNumber: formData.referenceNumber,
  status: formData.status,
  notes: formData.notes,
  items: items.map(item => ({
    productId: parseInt(item.productId) || 0,
    quantity: parseInt(item.quantity) || 0,
    unitPrice: parseFloat(item.unitPrice) || 0
  }))
}, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateReceipt;
