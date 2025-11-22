import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);

  const units = ["PCS", "KG", "L", "M", "BOX", "SET", "UNIT"];

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://your-backend-url/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to load product');

      const product = await response.json();
      setFormData({
        code: product.code,
        name: product.name,
        description: product.description || "",
        unit: product.unit,
        unitPrice: product.unitPrice.toString(),
        quantity: product.quantity.toString(),
        minStockLevel: product.minStockLevel.toString(),
        maxStockLevel: product.maxStockLevel.toString(),
        active: product.active
      });
      
    } catch (error) {
      console.error("Error loading product:", error);
      
      // For testing - load from localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const product = products.find(p => p.id === parseInt(id));
      
      if (product) {
        setFormData({
          code: product.code,
          name: product.name,
          description: product.description || "",
          unit: product.unit,
          unitPrice: product.unitPrice.toString(),
          quantity: product.quantity.toString(),
          minStockLevel: product.minStockLevel.toString(),
          maxStockLevel: product.maxStockLevel.toString(),
          active: product.active
        });
      }
    } finally {
      setLoading(false);
    }
  };

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
    
    if (!validateForm()) return;

    setIsSubmitting(true);

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
      const response = await fetch(`http://your-backend-url/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('Failed to update product');

      alert("Product updated successfully!");
      navigate(`/products/${id}`);
      
    } catch (error) {
      console.error("Error updating product:", error);
      
      // For testing - update in localStorage
      const products = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = products.map(p => 
        p.id === parseInt(id) ? { ...p, ...productData } : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      alert("Product updated successfully! (saved locally)");
      navigate(`/products/${id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">Edit Product</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                />
                {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
              </div>

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
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Unit *</label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Unit Price *</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  step="0.01"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.unitPrice ? 'border-red-500' : ''
                  }`}
                />
                {errors.unitPrice && <p className="text-red-500 text-sm mt-1">{errors.unitPrice}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.quantity ? 'border-red-500' : ''
                  }`}
                />
                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Min Stock Level *</label>
                <input
                  type="number"
                  name="minStockLevel"
                  value={formData.minStockLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.minStockLevel ? 'border-red-500' : ''
                  }`}
                />
                {errors.minStockLevel && <p className="text-red-500 text-sm mt-1">{errors.minStockLevel}</p>}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Max Stock Level *</label>
                <input
                  type="number"
                  name="maxStockLevel"
                  value={formData.maxStockLevel}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 ${
                    errors.maxStockLevel ? 'border-red-500' : ''
                  }`}
                />
                {errors.maxStockLevel && <p className="text-red-500 text-sm mt-1">{errors.maxStockLevel}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="active" className="ml-2 text-gray-700">
                  Active Product
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
              >
                {isSubmitting ? "Updating..." : "Update Product"}
              </button>
              <Link to={`/products/${id}`} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
