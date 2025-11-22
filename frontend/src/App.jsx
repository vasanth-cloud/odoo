import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import Landing from "./pages/auth/Landing";
import Profile from "./pages/Profile"
import Settings from "./pages/Settings";

// Dashboard
import Dashboard from "./pages/Dashboard";



// Products
import ProductList from "./pages/products/ProductList";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetails from "./pages/products/ProductDetails";

// Receipts
import ReceiptList from "./pages/receipts/ReceiptList";
import CreateReceipt from "./pages/receipts/CreateReceipt";
import ReceiptDetails from "./pages/receipts/ReceiptDetails";

// Deliveries
import DeliveryList from "./pages/deliveries/DeliveryList";
import CreateDelivery from "./pages/deliveries/CreateDelivery";
import DeliveryDetails from "./pages/deliveries/DeliveryDetails";

// Transfers
import TransferList from "./pages/transfers/TransferList";
import CreateTransfer from "./pages/transfers/CreateTransfer";
import TransferDetails from "./pages/transfers/TransferDetails";

// Adjustments
import AdjustmentList from "./pages/adjustments/AdjustmentList";
import CreateAdjustment from "./pages/adjustments/CreateAdjustment";
import AdjustmentDetails from "./pages/adjustments/AdjustmentDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Landing />} />
        <Route path="/profile" element={<Profile />} />\
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Products */}
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/create" element={<CreateProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/:id/edit" element={<EditProduct />} />

        {/* Receipts */}
        <Route path="/receipts" element={<ReceiptList />} />
        <Route path="/receipts/create" element={<CreateReceipt />} />
        <Route path="/receipts/:id" element={<ReceiptDetails />} />

        {/* Deliveries */}
        <Route path="/deliveries" element={<DeliveryList />} />
        <Route path="/deliveries/create" element={<CreateDelivery />} />
        <Route path="/deliveries/:id" element={<DeliveryDetails />} />

        {/* Transfers */}
        <Route path="/transfers" element={<TransferList />} />
        <Route path="/transfers/create" element={<CreateTransfer />} />
        <Route path="/transfers/:id" element={<TransferDetails />} />

        {/* Adjustments */}
        <Route path="/adjustments" element={<AdjustmentList />} />
        <Route path="/adjustments/create" element={<CreateAdjustment />} />
        <Route path="/adjustments/:id" element={<AdjustmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
