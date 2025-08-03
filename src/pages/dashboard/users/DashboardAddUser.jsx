import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function DashboardAddUser({ getUsers }) {
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    company: "",
    gst: "",
    email: "",
    phone: "",
    password: "",
    address: "", // 🔥 Added address field
    status: "pending",
  });

  const navigate = useNavigate();

  const signUp = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      toast.error(`Sign up error: ${err.message}`);
      return null;
    }
  };

  const addUser = async (id, data) => {
    try {
      const docRef = doc(db, "users", id);
      await setDoc(docRef, {
        ...data,
        created: serverTimestamp(),
        updated: serverTimestamp(),
      });
    } catch (err) {
      toast.error(`Firestore error: ${err.message}`);
    }
  };

  const handleChange = (e) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      role,
      firstName,
      lastName,
      company,
      gst,
      email,
      phone,
      password,
      address,
      status,
    } = formData;

    const currentUser = auth.currentUser;
    const adminEmail = currentUser.email;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    const result = await signUp(email, password);
    const id = result?.user?.uid;
    if (!id) return;

    const data = {
      role,
      firstName,
      lastName,
      company,
      gst,
      email,
      phone: phone.startsWith("+") ? phone : `+91${phone}`,
      address, // 🆕 Add address to data
      status,
    };

    await addUser(id, data);
    await getUsers();

    await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

    setFormData({
      role: "",
      firstName: "",
      lastName: "",
      company: "",
      gst: "",
      email: "",
      phone: "",
      password: "",
      address: "", // 🆕 Reset address
      status: "pending",
    });

    toast.success("User added successfully!");
    navigate("/dashboard/users");

    switch (data.status?.toLowerCase()) {
      case "pending":
        data.disclaimer =
          "Note: Users with a Pending status are not allowed to view product prices.";
        break;
      case "approved":
        data.disclaimer = "Note: You are approved to view product prices.";
        break;
      case "rejected":
        data.disclaimer =
          "Note: Your request has been rejected. You cannot view product prices.";
        break;
      default:
        data.disclaimer =
          "Note: Please contact support to check your access status.";
        break;
    }

    await emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      data,
      { publicKey: import.meta.env.VITE_PUBLIC_KEY }
    );
  };

  return (
    <>
      <main>
        <section>
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-1"
          >
            <div className="flex justify-center items-center gap-5">
              <label className="font-light text-xl flex gap-1">
                <input
                  type="radio"
                  name="role"
                  value="Salesperson"
                  onChange={handleChange}
                  required
                />
                Salesperson
              </label>
              <hr className="border h-10" />
              <label className="font-light text-xl flex gap-1">
                <input
                  type="radio"
                  name="role"
                  value="Business Entity"
                  onChange={handleChange}
                  required
                />
                Business Entity
              </label>
            </div>

            <div>
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                placeholder="First Name"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                placeholder="Last Name"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                placeholder="Company Name"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>GST Number</label>
              <input
                type="text"
                name="gst"
                value={formData.gst}
                placeholder="GST Number"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="Phone"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                placeholder="Address"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center items-center gap-5 my-5">
              <label className="font-light text-xl flex gap-1">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  onChange={handleChange}
                  checked={formData.status === "pending"}
                  required
                />
                Pending
              </label>
              <hr className="border h-10" />
              <label className="font-light text-xl flex gap-1">
                <input
                  type="radio"
                  name="status"
                  value="approved"
                  onChange={handleChange}
                  checked={formData.status === "approved"}
                  required
                />
                Approved
              </label>
              <hr className="border h-10" />
              <label className="font-light text-xl flex gap-1">
                <input
                  type="radio"
                  name="status"
                  value="rejected"
                  onChange={handleChange}
                  checked={formData.status === "rejected"}
                  required
                />
                Rejected
              </label>
            </div>

            <button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
              Add
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

DashboardAddUser.propTypes = {
  getUsers: PropTypes.func,
};

export default DashboardAddUser;
