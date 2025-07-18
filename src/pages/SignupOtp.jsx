import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db, storage } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import HeroSection from "../sections/HeroSection";
const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
const countryCodes = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "Australia", code: "+61" },
  { name: "Canada", code: "+1" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Singapore", code: "+65" },
  { name: "China", code: "+86" },
  { name: "Pakistan", code: "+92" },
  { name: "Bangladesh", code: "+880" },
  { name: "Japan", code: "+81" },
  { name: "Russia", code: "+7" },
  { name: "Brazil", code: "+55" },
  { name: "South Africa", code: "+27" },
  { name: "Sri Lanka", code: "+94" },
  { name: "Nepal", code: "+977" },
  { name: "Afghanistan", code: "+93" },
  { name: "Saudi Arabia", code: "+966" },
  { name: "Turkey", code: "+90" },
  { name: "Malaysia", code: "+60" },
  { name: "Italy", code: "+39" },
  { name: "Mexico", code: "+52" },
  { name: "Spain", code: "+34" },
  { name: "Switzerland", code: "+41" },
  { name: "Netherlands", code: "+31" },
  { name: "New Zealand", code: "+64" },
  { name: "Indonesia", code: "+62" },
  { name: "Philippines", code: "+63" },
  { name: "Thailand", code: "+66" },
  { name: "Egypt", code: "+20" },
];

function SignupOtp({ user }) {
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    company: "",
    gst: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    status: "pending",
    visitingCard: null,
  });
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "superuser") navigate("/dashboard");
      else navigate("/products");
    }
  }, [user, navigate]);

  const getFullPhoneNumber = () => {
    const cleaned = formData.phone.replace(/^0+/, "");
    return `${countryCode}${cleaned}`;
  };

  const sendOtp = async () => {
    try {
      const response = await fetch(`${url}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: getFullPhoneNumber() }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("OTP sent successfully!");
        setShowOtpField(true);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("OTP sending failed.");
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${url}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: getFullPhoneNumber(), otp }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("OTP verified successfully!");
        return true;
      } else {
        toast.error(data.message || "Invalid OTP");
        return false;
      }
    } catch (error) {
      toast.error("Something went wrong during OTP verification.");
      return false;
    }
  };

  const signUp = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  };

  const uploadVisitingCard = async (userId, file) => {
    const fileRef = ref(storage, `visitingCards/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

  const addUser = async (id, data) => {
    const docRef = doc(db, "users", id);
    await setDoc(docRef, {
      ...data,
      created: serverTimestamp(),
      updated: serverTimestamp(),
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!showOtpField) {
        await sendOtp();
        return;
      }

      const isOtpVerified = await verifyOtp();
      if (!isOtpVerified) return;

      const {
        role,
        firstName,
        lastName,
        company,
        gst,
        dob,
        email,
        password,
        address,
        status,
        visitingCard,
      } = formData;

      const phone = getFullPhoneNumber();
      const uid = await signUp(email, password);
      let visitingCardUrl = "";

      if (visitingCard) {
        visitingCardUrl = await uploadVisitingCard(uid, visitingCard);
      }

      const userData = {
        role,
        firstName,
        lastName,
        company,
        gst,
        dob,
        phone,
        email,
        password,
        address,
        status,
        visitingCard: visitingCardUrl,
      };

      await addUser(uid, userData);

      toast.success("Account created successfully!");
      navigate("/dashboard");

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          ...userData,
          disclaimer:
            status === "pending"
              ? "Note: Users with a Pending status are not allowed to view product prices."
              : status === "approved"
              ? "Note: You are approved to view product prices."
              : "Note: Your request has been rejected. You cannot view product prices.",
        },
        import.meta.env.VITE_PUBLIC_KEY
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <main>
        <HeroSection />
        <section>
          <div className="w-[80%] mx-auto py-12 relative overflow-hidden z-10">
            <div className="bg-[#F9F9FF] w-full aspect-square rounded-full absolute top-12 left-1/2 -translate-x-1/2 -z-10"></div>
            <h1 className="text-primary font-medium text-3xl text-center mb-3 lg:text-7xl">Sign up</h1>
            <form method="post" className="max-w-96 mx-auto flex flex-col gap-1" onSubmit={handleSubmit}>
              <div className="flex justify-center items-center gap-5">
                <label className="font-light text-xl flex gap-1">
                  <input type="radio" name="role" value="Salesperson" onChange={handleChange} required />
                  Salesperson
                </label>
                <hr className="border h-10" />
                <label className="font-light text-xl flex gap-1">
                  <input type="radio" name="role" value="Business Entity" onChange={handleChange} required />
                  Business Entity
                </label>
              </div>
              <div>
                <label>First Name<span className="text-red-500">*</span></label>
                <input type="text" name="firstName" value={formData.firstName} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} />
              </div>
              <div>
                <label>Company Name<span className="text-red-500">*</span></label>
                <input type="text" name="company" value={formData.company} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required />
              </div>
              <div>
                <label>GST Number</label>
                <input type="text" name="gst" value={formData.gst} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} />
              </div>
              <div>
                <label>Date of Birth<span className="text-red-500">*</span></label>
                <input type="date" name="dob" value={formData.dob} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required />
              </div>
              <div>
                <label>Phone<span className="text-red-500">*</span></label>
                <div className="flex">
                  <select
                    className="bg-white rounded border py-1 px-2 outline-none focus:border-secondary"
                    value={countryCode}
                    onChange={e => setCountryCode(e.target.value)}
                    style={{ maxWidth: 130, minWidth: 90 }}
                  >
                    {countryCodes.map((country) => (
                      <option key={`${country.code}-${country.name}`} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div>
                <label>Email<span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required />
              </div>
              <div>
                <label>Password<span className="text-red-500">*</span></label>
                <input type="password" name="password" value={formData.password} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required />
              </div>
              <div>
                <label>Address<span className="text-red-500">*</span></label>
                <input type="text" name="address" value={formData.address} placeholder="Full Address" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required />
              </div>
              <div>
                <label>Visiting Card<span className="text-red-500">*</span></label>
                <input type="file" name="visitingCard" accept=".jpg, .jpeg, .png, .pdf" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={(e) => setFormData((state) => ({ ...state, visitingCard: e.target.files[0] }))} required />
              </div>
              {showOtpField && (
                <div>
                  <label>OTP</label>
                  <input type="text" value={otp} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleOtpChange} required />
                </div>
              )}
              <div id="recaptcha-container"></div>
              <button type="submit" className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
                {showOtpField ? "Verify OTP & Sign Up" : "Send OTP"}
              </button>
              <Link to="/signin" className="text-right">Sign in</Link>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

SignupOtp.propTypes = {
  user: PropTypes.object,
};

export default SignupOtp;
