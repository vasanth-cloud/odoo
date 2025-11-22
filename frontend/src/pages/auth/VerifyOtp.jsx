import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Replace with your API endpoint
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        // Navigate to reset password page
        navigate("/reset-password", { state: { email, otp } });
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Verify OTP</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter the verification code sent to<br />
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Verification Code</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg text-center text-2xl tracking-widest focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="000000"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
          >
            {isSubmitting ? "Verifying..." : "Verify Code"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
