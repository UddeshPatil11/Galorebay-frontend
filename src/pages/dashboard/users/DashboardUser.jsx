import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../../utils/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

function DashboardUser({ getUsers }) {
  const [formData, setFormData] = useState({
    role: "",
    firstName: "",
    lastName: "",
    company: "",
    gst: "",
    email: "",
    phone: "",
    status: "pending",
  });
  const [initialStatus, setInitialStatus] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const getUser = useCallback(async () => {
    try {
      const docRef = doc(db, "users", id);
      const snapshot = await getDoc(docRef);
      const { role, firstName, lastName, company, gst, email, phone, status } =
        snapshot.data();
      setFormData((state) => ({
        ...state,
        role,
        firstName,
        lastName,
        company,
        gst,
        email,
        phone,
        status,
      }));
      setInitialStatus(status); // Save the original status
    } catch {
      toast.error("Error!");
    }
  }, [id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const updateUser = async (data) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, { ...data, updated: serverTimestamp() });
    } catch {
      toast.error("Error!");
    }
  };

  const handleChange = (e) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { role, firstName, lastName, company, gst, email, phone, status } =
      formData;
    const data = {
      role,
      firstName,
      lastName,
      company,
      gst,
      email,
      phone: phone.startsWith("+") ? phone : `+91${phone}`,
      status,
    };

    await updateUser(data);
    await getUsers();

    setFormData({
      role: "",
      firstName: "",
      lastName: "",
      company: "",
      gst: "",
      email: "",
      phone: "",
      status: "pending",
    });

    toast.success("Success!");
    navigate("/dashboard/users");

    //
    if (status !== initialStatus) {
      switch (status?.toLowerCase()) {
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

      //
      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        data,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      );
    }
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
                  checked={formData.role === "Salesperson"}
                  // required
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
                  checked={formData.role === "Business Entity"}
                  // required
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
              Update
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

DashboardUser.propTypes = { getUsers: PropTypes.func };

export default DashboardUser;
