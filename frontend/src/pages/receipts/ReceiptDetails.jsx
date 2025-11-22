import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ReceiptDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const statusOptions = ["DRAFT", "PENDING", "APPROVED", "RECEIVED", "CANCELLED"];

  useEffect(() => {
    loadReceipt();
  }, [id]);

  const loadReceipt = async () => {
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setReceipt({
          id: id,
          receiptNumber: `RCP-${id}`,
          supplier: "ABC Supplies Inc.",
          status: "PENDING",
          receiptDate: new Date().toISOString(),
          referenceNumber: "REF-2024-001",
          warehouse: "Main Warehouse",
          receivedBy: "John Doe",
          notes: "Items received in good condition. All packaging intact.",
          items: [
            { productId: 101, productName: "Steel Rods", sku: "STL-001", quantity: 50, unitPrice: 125.00 },
            { productId: 102, productName: "Wooden Planks", sku: "WD-002", quantity: 100, unitPrice: 45.50 },
            { productId: 103, productName: "Plastic Sheets", sku: "PLS-003", quantity: 75, unitPrice: 32.00 },
          ]
        });
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error loading receipt:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!window.confirm(`Change status to ${newStatus}?`)) return;

    setUpdatingStatus(true);
    try {
      setTimeout(() => {
        setReceipt({ ...receipt, status: newStatus });
        setUpdatingStatus(false);
      }, 1000);
    } catch (error) {
      console.error("Error updating status:", error);
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "DRAFT": "bg-slate-100 text-slate-700 border-slate-200",
      "PENDING": "bg-amber-100 text-amber-700 border-amber-200",
      "APPROVED": "bg-blue-100 text-blue-700 border-blue-200",
      "RECEIVED": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "CANCELLED": "bg-rose-100 text-rose-700 border-rose-200",
    };
    return colors[status] || "bg-slate-100 text-slate-700 border-slate-200";
  };

  const getStatusIcon = (status) => {
    const icons = {
      "DRAFT": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      "PENDING": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      "APPROVED": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      "RECEIVED": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      "CANCELLED": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
    };
    return icons[status] || icons.DRAFT;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 mx-auto"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute top-0 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <p className="mt-6 text-slate-700 font-semibold animate-pulse">Loading receipt details...</p>
        </div>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Receipt Not Found</h2>
          <p className="text-slate-600 mb-6">The receipt you're looking for doesn't exist.</p>
          <Link 
            to="/receipts" 
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Receipts</span>
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = receipt.items?.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
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
                <h1 className="text-2xl font-bold text-slate-800">Receipt Details</h1>
                <p className="text-sm text-slate-600">View and manage receipt information</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print</span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Receipt Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{receipt.receiptNumber}</h2>
                    <p className="text-blue-100 text-sm mt-1">Receipt Document</p>
                  </div>
                </div>
              </div>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border-2 ${getStatusColor(receipt.status)} bg-white font-semibold`}>
                {getStatusIcon(receipt.status)}
                <span>{receipt.status}</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Supplier</p>
                    <p className="text-slate-800 font-semibold mt-1">{receipt.supplier}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Warehouse</p>
                    <p className="text-slate-800 font-semibold mt-1">{receipt.warehouse}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Receipt Date</p>
                    <p className="text-slate-800 font-semibold mt-1">
                      {new Date(receipt.receiptDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {new Date(receipt.receiptDate).toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Reference Number</p>
                    <p className="text-slate-800 font-semibold mt-1">{receipt.referenceNumber || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase">Received By</p>
                    <p className="text-slate-800 font-semibold mt-1">{receipt.receivedBy}</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs text-blue-600 font-semibold uppercase mb-1">Total Value</p>
                  <p className="text-3xl font-bold text-blue-700">${totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Receipt Items</h3>
                <p className="text-sm text-slate-600">{receipt.items?.length || 0} items in this receipt</p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipt.items && receipt.items.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                          {item.productId}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{item.productName}</p>
                          <p className="text-xs text-slate-500">ID: {item.productId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-sm font-mono">
                        {item.sku}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-slate-800">{item.quantity}</span>
                      <span className="text-slate-500 text-sm ml-1">units</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-slate-700">${item.unitPrice.toFixed(2)}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-slate-800">
                        ${(item.quantity * item.unitPrice).toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-right font-bold text-slate-800 text-lg">
                    Total Amount:
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-2xl font-bold text-blue-600">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notes & Status Update */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes */}
          {receipt.notes && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Notes</h3>
                  <p className="text-sm text-slate-600">Additional information</p>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-slate-700 leading-relaxed">{receipt.notes}</p>
              </div>
            </div>
          )}

          {/* Status Update */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Update Status</h3>
                <p className="text-sm text-slate-600">Change receipt status</p>
              </div>
            </div>
            <div className="space-y-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => updateStatus(status)}
                  disabled={updatingStatus || receipt.status === status}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    receipt.status === status
                      ? `${getStatusColor(status)} border-2 cursor-not-allowed opacity-60`
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-2 border-transparent hover:border-blue-200'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                    <span>{status}</span>
                  </span>
                  {receipt.status === status && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptDetails;
