import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    
    // Calculate password strength
    if (e.target.name === "password") {
      const pass = e.target.value;
      let strength = 0;
      if (pass.length >= 6) strength += 25;
      if (pass.length >= 10) strength += 25;
      if (/[A-Z]/.test(pass)) strength += 25;
      if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setIsSubmitting(true);

    // Simulate signup
    setTimeout(() => {
      console.log("Signup successful:", formData);
      navigate("/login");
    }, 1000);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500";
    if (passwordStrength <= 50) return "bg-orange-500";
    if (passwordStrength <= 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 25) return "Weak";
    if (passwordStrength <= 50) return "Fair";
    if (passwordStrength <= 75) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-gentle"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl animate-blob-gentle animation-delay-2000"></div>
      </div>

      {/* Signup Container */}
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
              Join Our Platform
            </h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Start managing your warehouse inventory efficiently with powerful tools and real-time insights.
            </p>
          </div>

          {/* Animated Illustration */}
          <div className="relative z-10">
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:translate-x-2 transition-transform duration-300">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-medium">Real-time Inventory Tracking</span>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:translate-x-2 transition-transform duration-300 animation-delay-1000">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Advanced Analytics Dashboard</span>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 transform hover:translate-x-2 transition-transform duration-300 animation-delay-2000">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-white font-medium">Secure & Encrypted Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Create a strong password"
                  required
                />
              </div>
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password Strength</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength <= 25 ? "text-red-500" :
                      passwordStrength <= 50 ? "text-orange-500" :
                      passwordStrength <= 75 ? "text-yellow-500" :
                      "text-green-500"
                    }`}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getStrengthColor()} transition-all duration-300 rounded-full`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  placeholder="Re-enter your password"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-5 h-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
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
            {/* Submit Button */}
<button
  type="submit"
  disabled={isSubmitting}
  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
>
  {isSubmitting ? (
    <>
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Creating Account...</span>
    </>
  ) : (
    <>
      <span>Create Account</span>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </>
  )}
</button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
