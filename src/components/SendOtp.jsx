import { useState } from "react";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
function SendOtp() {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${url}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("OTP sent successfully!");
      } else {
        setStatus(`Failed to send OTP: ${data.message}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setStatus("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Send OTP with Twilio</h2>

      <input
        type="tel"
        placeholder="Enter phone number (e.g. +919999999999)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <button
        onClick={sendOtp}
        disabled={loading || !phone}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Sending..." : "Send OTP"}
      </button>

      {status && (
        <p className="mt-3 text-sm text-center text-gray-700">{status}</p>
      )}
    </div>
  );
}

export default SendOtp;
