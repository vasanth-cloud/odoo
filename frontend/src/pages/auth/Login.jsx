import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        console.log("Login successful:", { email, password, rememberMe });
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-gentle"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-gentle animation-delay-2000"></div>
      </div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in">
        {/* Left Side - Illustration/Info */}
        <div className="hidden md:flex bg-gradient-to-br from-blue-600 to-indigo-600 p-12 flex-col justify-between relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-white">StockMaster</span>
            </Link>

            <h2 className="text-4xl font-bold text-white mb-4">
              Welcome Back!
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Sign in to access your warehouse management dashboard and continue optimizing your inventory.
            </p>
          </div>

          {/* Stats/Features */}
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-blue-100 text-sm">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-blue-100 text-sm">Uptime</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-100 text-sm">Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-1">Fast</div>
              <div className="text-blue-100 text-sm">Performance</div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* Mobile Logo */}
          <Link to="/" className="md:hidden flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">StockMaster</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none">
                  Remember me
                </label>
              </div>
              <Link 
                to="/forgot-password" 
                className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg flex items-center space-x-3 animate-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200">
              Create Account
            </Link>
          </p>

          {/* Additional Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <Link to="/terms" className="hover:text-blue-600 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-blue-600 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/help" className="hover:text-blue-600 transition-colors duration-200">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
