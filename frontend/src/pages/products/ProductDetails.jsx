import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Get product from localStorage
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Product not found</p>
          <Link to="/products" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Product Details</h1>
          <Link to={`/products/${id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Edit Product
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Product Name</p>
              <p className="text-xl font-semibold">{product.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">SKU</p>
              <p className="text-xl font-semibold font-mono">{product.sku}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Category</p>
              <p className="text-xl font-semibold">{product.category}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Stock</p>
              <p className={`text-xl font-semibold ${product.stock < 50 ? 'text-red-600' : 'text-green-600'}`}>
                {product.stock} units
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <p className="text-xl font-semibold">${product.price}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Reorder Point</p>
              <p className="text-xl font-semibold">{product.reorderPoint} units</p>
            </div>
          </div>

          {product.description && (
            <div>
              <p className="text-gray-500 text-sm mb-2">Description</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          <Link to="/products" className="inline-block bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 mt-4">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
