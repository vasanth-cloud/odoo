import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateReceipt() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    receiptNumber: "",
    receiptDate: "",
    supplier: "",
    referenceNumber: "",
    warehouse: "Main Warehouse",
    status: "DRAFT",
    notes: ""
  });

  const [items, setItems] = useState([
    { productName: "", sku: "", quantity: "", unitPrice: "" }
  ]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = ["DRAFT", "PENDING", "APPROVED", "RECEIVED", "CANCELLED"];

  useEffect(() => {
    generateReceiptNumber();
    setDefaultDateTime();
  }, []);

  const generateReceiptNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    setFormData(prev => ({
      ...prev,
      receiptNumber: `RCP-${timestamp}`
    }));
  };

  const setDefaultDateTime = () => {
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setFormData(prev => ({ ...prev, receiptDate: localDateTime }));
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
    setItems([...items, { productName: "", sku: "", quantity: "", unitPrice: "" }]);
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
    
    const hasEmptyItems = items.some(item => 
      !item.productName.trim() || !item.quantity || !item.unitPrice
    );
    if (hasEmptyItems) newErrors.items = "All item fields must be filled";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const receiptData = {
      ...formData,
      receiptDate: new Date(formData.receiptDate).toISOString(),
      items: items.map(item => ({
        productName: item.productName,
        sku: item.sku || "N/A",
        quantity: parseInt(item.quantity),
        unitPrice: parseFloat(item.unitPrice)
      }))
    };

    try {
      // Simulate API call
      setTimeout(() => {
        console.log("Receipt created:", receiptData);
        alert("Receipt created successfully!");
        navigate("/receipts");
      }, 1500);
    } catch (error) {
      console.error("Error creating receipt:", error);
      alert("Error creating receipt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => {
      return sum + ((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0));
    }, 0);
  };

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-slate-100 text-slate-700",
      "PENDING": "bg-amber-100 text-amber-700",
      "APPROVED": "bg-blue-100 text-blue-700",
      "RECEIVED": "bg-emerald-100 text-emerald-700",
      "CANCELLED": "bg-rose-100 text-rose-700",
    };
    return colors[status] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/receipts" 
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
              >
                <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Create New Receipt</h1>
                <p className="text-sm text-slate-600">Add a new receipt to your inventory</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={generateReceiptNumber}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Generate New ID</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Receipt Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Receipt Information</h2>
                  <p className="text-blue-100 text-sm">Basic details about this receipt</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Receipt Number */}
                <div className="group">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>Receipt Number *</span>
                  </label>
                  <input
                    type="text"
                    name="receiptNumber"
                    value={formData.receiptNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-slate-50 font-mono"
                    readOnly
                  />
                  {errors.receiptNumber && (
                    <p className="text-rose-600 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.receiptNumber}</span>
                    </p>
                  )}
                </div>

                {/* Receipt Date */}
                <div className="group">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Receipt Date *</span>
                  </label>
                  <input
                    type="datetime-local"
                    name="receiptDate"
                    value={formData.receiptDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  />
                  {errors.receiptDate && (
                    <p className="text-rose-600 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.receiptDate}</span>
                    </p>
                  )}
                </div>

                {/* Supplier */}
                <div className="group">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>Supplier *</span>
                  </label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder="Enter supplier name"
                  />
                  {errors.supplier && (
                    <p className="text-rose-600 text-sm mt-2 flex items-center space-x-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{errors.supplier}</span>
                    </p>
                  )}
                </div>

                {/* Reference Number */}
                <div className="group">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Reference Number</span>
                  </label>
                  <input
                    type="text"
                    name="referenceNumber"
                    value={formData.referenceNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder="Optional reference number"
                  />
                </div>

                {/* Warehouse */}
                <div className="group">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span>Warehouse</span>
                  </label>
                  <input
                    type="text"
                    name="warehouse"
                    value={formData.warehouse}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    placeholder="Warehouse location"
                  />
                </div>

                {/* Status */}
                <div className="group">
                  <label className="block text-slate-700 mb-2 font-medium text-sm flex items-center space-x-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Status *</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-medium"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Items Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Receipt Items</h2>
                    <p className="text-emerald-100 text-sm">Add products to this receipt</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Add Item</span>
                </button>
              </div>
            </div>

            <div className="p-8">
              {errors.items && (
                <div className="mb-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 p-4 rounded-lg flex items-center space-x-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{errors.items}</span>
                </div>
              )}

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-300 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">Item #{index + 1}</h3>
                          <p className="text-xs text-slate-600">Product details</p>
                        </div>
                      </div>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="p-2 bg-rose-100 text-rose-600 rounded-lg hover:bg-rose-200 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {/* Product Name */}
                      <div className="md:col-span-2">
                        <label className="block text-slate-700 text-sm font-medium mb-2">Product Name *</label>
                        <input
                          type="text"
                          value={item.productName}
                          onChange={(e) => handleItemChange(index, "productName", e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                          placeholder="Enter product name"
                        />
                      </div>

                      {/* SKU */}
                      <div>
                        <label className="block text-slate-700 text-sm font-medium mb-2">SKU/Code</label>
                        <input
                          type="text"
                          value={item.sku}
                          onChange={(e) => handleItemChange(index, "sku", e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 font-mono text-sm"
                          placeholder="SKU-001"
                        />
                      </div>

                      {/* Quantity */}
                      <div>
                        <label className="block text-slate-700 text-sm font-medium mb-2">Quantity *</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                          min="1"
                          placeholder="0"
                        />
                      </div>

                      {/* Unit Price */}
                      <div>
                        <label className="block text-slate-700 text-sm font-medium mb-2">Unit Price *</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-semibold">$</span>
                          <input
                            type="number"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                            className="w-full pl-8 pr-4 py-2.5 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            min="0"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-4 flex items-center justify-end space-x-2 text-sm">
                      <span className="text-slate-600">Item Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${((item.quantity || 0) * (item.unitPrice || 0)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Grand Total</p>
                    <p className="text-4xl font-bold">${calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Additional Notes</h3>
                  <p className="text-sm text-slate-600">Add any relevant information</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-none"
                placeholder="Enter any additional notes or comments about this receipt..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <Link
              to="/receipts"
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
  {isSubmitting ? (
    <>
      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Creating Receipt...</span>
    </>
  ) : (
    <>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span>Create Receipt</span>
    </>
  )}
</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReceipt;
