import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/auth/landing";
// Authentication
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import OtpPage from "./pages/auth/OtpPage";

// Dashboard
// import Dashboard from "./pages/Dashboard";

// Products
// import ProductList from "./pages/products/ProductList";
// import CreateProduct from "./pages/products/CreateProduct";
// import ProductDetails from "./pages/products/ProductDetails";
// import EditProduct from "./pages/products/EditProduct";

// Receipts
// import ReceiptList from "./pages/receipts/ReceiptList";
// import CreateReceipt from "./pages/receipts/CreateReceipt";
// import ReceiptDetails from "./pages/receipts/ReceiptDetails";

// Deliveries
// import DeliveryList from "./pages/deliveries/DeliveryList";
// import CreateDelivery from "./pages/deliveries/CreateDelivery";
// import DeliveryDetails from "./pages/deliveries/DeliveryDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpPage />} /> */}

        {/* Dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Products */}
        {/* <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} /> */}

        {/* Receipts */}
        {/* <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/receipts/create" element={<CreateReceipt />} />
        <Route path="/receipts/:id" element={<ReceiptDetails />} /> */}

        {/* Deliveries */}
        {/* <Route path="/deliveries" element={<DeliveryList />} />
        <Route path="/deliveries/create" element={<CreateDelivery />} />
        <Route path="/deliveries/:id" element={<DeliveryDetails />} /> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
