import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD

// Authentication
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";

// Dashboard
import Dashboard from "./pages/Dashboard";
=======
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
>>>>>>> 18a200997cc88405316721cd72cc977156a78e29

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
<<<<<<< HEAD
        {/* Authentication */}
        <Route path="/" element={<Login />} />
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
=======
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

>>>>>>> 18a200997cc88405316721cd72cc977156a78e29
      </Routes>
    </BrowserRouter>
  );
}

export default App;
