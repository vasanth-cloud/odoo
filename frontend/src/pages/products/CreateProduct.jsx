import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    category: "",
    unit: "PCS",
    unitPrice: "",
    quantity: "",
    minStockLevel: "",
    maxStockLevel: "",
    reorderPoint: "",
    location: "",
    active: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const units = ["PCS", "KG", "L", "M", "BOX", "SET", "UNIT", "PACK", "CARTON"];
  const categories = ["Raw Materials", "Finished Goods", "Components", "Tools", "Supplies", "Equipment"];

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

  const generateCode = () => {
    const prefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : "PRD";
    const timestamp = Date.now().toString().slice(-6);
    setFormData({ ...formData, code: `${prefix}-${timestamp}` });
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

    const productData = {
      code: formData.code.toUpperCase(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      unit: formData.unit,
      unitPrice: parseFloat(formData.unitPrice),
      quantity: parseInt(formData.quantity),
      minStockLevel: parseInt(formData.minStockLevel),
      maxStockLevel: parseInt(formData.maxStockLevel),
      reorderPoint: parseInt(formData.reorderPoint) || parseInt(formData.minStockLevel),
      location: formData.location,
      active: formData.active
    };

    try {
      setTimeout(() => {
        console.log("Product created:", productData);
        alert("Product created successfully!");
        navigate("/products");
      }, 1500);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStockStatus = () => {
    const qty = parseInt(formData.quantity) || 0;
    const min = parseInt(formData.minStockLevel) || 0;
    const max = parseInt(formData.maxStockLevel) || 0;
    
    if (qty === 0) return { text: "Out of Stock", color: "text-rose-600 bg-rose-50" };
    if (qty < min) return { text: "Low Stock", color: "text-amber-600 bg-amber-50" };
    if (qty > max) return { text: "Overstock", color: "text-purple-600 bg-purple-50" };
    return { text: "Optimal", color: "text-emerald-600 bg-emerald-50" };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/products" 
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Create New Product</h1>
                <p className="text-sm text-slate-600">Add a new product to your inventory</p>
              </div>
            </div>
            <button
              type="button"
              onClick={generateCode}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Generate Code</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Basic Information</h2>
                  <p className="text-blue-100 text-sm">Product identification and details</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Code */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Product Code *</span>
                  </label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-mono uppercase ${
                      errors.code ? 'border-rose-500' : 'border-slate-200'
                    }`}
                    placeholder="PRD-123456"
                  />
                  {errors.code && (
                    <p className="text-rose-600 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.code}</span>
                    </p>
                  )}
                </div>

                {/* Product Name */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Product Name *</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 ${
                      errors.name ? 'border-rose-500' : 'border-slate-200'
                    }`}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-rose-600 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Category</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Warehouse Location</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder="e.g., Shelf A1, Zone 3"
                  />
                </div>

                {/* Description - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <span>Description</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                    placeholder="Enter detailed product description..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing & Units Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Pricing & Units</h2>
                  <p className="text-emerald-100 text-sm">Set pricing and measurement units</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Unit */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    <span>Unit of Measurement *</span>
                  </label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 ${
                      errors.unit ? 'border-rose-500' : 'border-slate-200'
                    }`}
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  {errors.unit && (
                    <p className="text-rose-600 text-sm mt-2">{errors.unit}</p>
                  )}
                </div>

                {/* Unit Price */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Unit Price *</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input
                      type="number"
                      name="unitPrice"
                      value={formData.unitPrice}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      className={`w-full pl-8 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-300 ${
                        errors.unitPrice ? 'border-rose-500' : 'border-slate-200'
                      }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.unitPrice && (
                    <p className="text-rose-600 text-sm mt-2">{errors.unitPrice}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stock Management Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Stock Management</h2>
                    <p className="text-purple-100 text-sm">Configure inventory levels</p>
                  </div>
                </div>
                {formData.quantity && (
                  <div className={`px-4 py-2 rounded-xl font-semibold ${stockStatus.color}`}>
                    {stockStatus.text}
                  </div>
                )}
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Quantity */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Current Quantity *</span>
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 ${
                      errors.quantity ? 'border-rose-500' : 'border-slate-200'
                    }`}
                    placeholder="0"
                  />
                  {errors.quantity && (
                    <p className="text-rose-600 text-sm mt-2">{errors.quantity}</p>
                  )}
                </div>

                {/* Reorder Point */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Reorder Point</span>
                  </label>
                  <input
                    type="number"
                    name="reorderPoint"
                    value={formData.reorderPoint}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300"
                    placeholder="Trigger reorder at this level"
                  />
                </div>

                {/* Min Stock Level */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <span>Minimum Stock Level *</span>
                  </label>
                  <input
                    type="number"
                    name="minStockLevel"
                    value={formData.minStockLevel}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 ${
                      errors.minStockLevel ? 'border-rose-500' : 'border-slate-200'
                    }`}
                    placeholder="10"
                  />
                  {errors.minStockLevel && (
                    <p className="text-rose-600 text-sm mt-2">{errors.minStockLevel}</p>
                  )}
                </div>

                {/* Max Stock Level */}
                <div>
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>Maximum Stock Level *</span>
                  </label>
                  <input
                    type="number"
                    name="maxStockLevel"
                    value={formData.maxStockLevel}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 ${
                      errors.maxStockLevel ? 'border-rose-500' : 'border-slate-200'
                    }`}
                    placeholder="1000"
                  />
                  {errors.maxStockLevel && (
                    <p className="text-rose-600 text-sm mt-2">{errors.maxStockLevel}</p>
                  )}
                </div>
              </div>

              {/* Stock Level Visualization */}
              {formData.quantity && formData.minStockLevel && formData.maxStockLevel && (
                <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-purple-50 rounded-xl border border-purple-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Stock Level</span>
                    <span className="text-sm font-semibold text-purple-600">
                      {formData.quantity} / {formData.maxStockLevel} units
                    </span>
                  </div>
                  <div className="relative w-full h-4 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((parseInt(formData.quantity) / parseInt(formData.maxStockLevel)) * 100, 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-slate-600">
                    <span>Min: {formData.minStockLevel}</span>
                    <span>Max: {formData.maxStockLevel}</span>
                  </div>
                </div>
              )}

              {/* Active Status */}
              <div className="mt-6 flex items-center space-x-3 p-4 bg-slate-50 rounded-xl">
                <input
                  type="checkbox"
                  name="active"
                  id="active"
                  checked={formData.active}
                  onChange={handleChange}
                  className="w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="active" className="flex-1 cursor-pointer">
                  <span className="font-semibold text-slate-800">Active Product</span>
                  <p className="text-sm text-slate-600">This product is available for transactions</p>
                </label>
                {formData.active && (
                  <div className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold">
                    Active
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <Link
              to="/products"
              className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>Cancel</span>
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{isSubmitting ? "Creating Product..." : "Create Product"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;
