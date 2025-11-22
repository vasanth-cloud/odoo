import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    unit: "PCS",
    unitPrice: "",
    quantity: "",
    minStockLevel: "",
    maxStockLevel: "",
    active: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const units = ["PCS", "KG", "L", "M", "BOX", "SET", "UNIT"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.code.trim()) newErrors.code = "Product code is required";
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.unitPrice || formData.unitPrice <= 0) newErrors.unitPrice = "Valid unit price is required";
    if (!formData.quantity || formData.quantity < 0) newErrors.quantity = "Valid quantity is required";
    if (!formData.minStockLevel || formData.minStockLevel < 0) newErrors.minStockLevel = "Valid min stock level is required";
    if (!formData.maxStockLevel || formData.maxStockLevel < 0) newErrors.maxStockLevel = "Valid max stock level is required";
    
    if (formData.minStockLevel && formData.maxStockLevel && 
        parseInt(formData.minStockLevel) >= parseInt(formData.maxStockLevel)) {
      newErrors.maxStockLevel = "Max stock level must be greater than min stock level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare data in your exact format
    const productData = {
      code: formData.code.toUpperCase(),
      name: formData.name,
      description: formData.description,
      unit: formData.unit,
      unitPrice: parseFloat(formData.unitPrice),
      quantity: parseInt(formData.quantity),
      minStockLevel: parseInt(formData.minStockLevel),
      maxStockLevel: parseInt(formData.maxStockLevel),
      active: formData.active
    };

    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://your-backend-url/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const result = await response.json();
      console.log("Product created:", result);
      
      alert("Product created successfully!");
      navigate("/products");
      
    } catch (error) {
      console.error("Error creating product:", error);
      
      // For testing without backend - save to localStorage
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const newProduct = { id: Date.now(), ...productData };
      localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));
      
      alert("Product created successfully! (saved locally)");
      navigate("/products");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Create New Product</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Product Code */}
              <div>
                <label className="block text-gray-700 mb-1">Product Code *</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 uppercase ${
                    errors.code ? 'border-red-500' : ''
                  }`}
                  placeholder="e.g., PROD001"
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-gray-700 mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.name ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter product name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Unit */}
              <div>
                <label className="block text-gray-700 mb-1">Unit *</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.unit ? 'border-red-500' : ''
                  }`}
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
              </div>

              {/* Unit Price */}
              <div>
                <label className="block text-gray-700 mb-1">Unit Price *</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.unitPrice ? 'border-red-500' : ''
                  }`}
                  placeholder="0.00"
                />
                {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.quantity ? 'border-red-500' : ''
                  }`}
                  placeholder="0"
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
              </div>

              {/* Min Stock Level */}
              <div>
                <label className="block text-gray-700 mb-1">Min Stock Level *</label>
                <input
                  type="number"
                  name="minStockLevel"
                  value={formData.minStockLevel}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.minStockLevel ? 'border-red-500' : ''
                  }`}
                  placeholder="10"
                />
                {errors.minStockLevel && <p className="text-red-500 text-sm mt-1">{errors.minStockLevel}</p>}
              </div>

              {/* Max Stock Level */}
              <div>
                <label className="block text-gray-700 mb-1">Max Stock Level *</label>
                <input
                  type="number"
                  name="maxStockLevel"
                  value={formData.maxStockLevel}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.maxStockLevel ? 'border-red-500' : ''
                  }`}
                  placeholder="1000"
                />
                {errors.maxStockLevel && <p className="text-red-500 text-sm mt-1">{errors.maxStockLevel}</p>}
              </div>

              {/* Active Status */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring focus:ring-blue-300"
                />
                <label htmlFor="active" className="ml-2 text-gray-700">
                  Active Product
                </label>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter product description..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Product"}
              </button>
              <Link
                to="/products"
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Preview JSON */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-700 mb-2">Preview (JSON Format):</p>
            <pre className="text-xs bg-gray-800 text-green-400 p-3 rounded overflow-x-auto">
{JSON.stringify({
  code: formData.code.toUpperCase(),
  name: formData.name,
  description: formData.description,
  unit: formData.unit,
  unitPrice: parseFloat(formData.unitPrice) || 0,
  quantity: parseInt(formData.quantity) || 0,
  minStockLevel: parseInt(formData.minStockLevel) || 0,
  maxStockLevel: parseInt(formData.maxStockLevel) || 0,
  active: formData.active
}, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
