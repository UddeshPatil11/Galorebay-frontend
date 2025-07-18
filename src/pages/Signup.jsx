import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db } from '../utils/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import emailjs from "@emailjs/browser"
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'

function Signup({ user }) {
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    company: '',
    gst: '',
    dob: '',
    email: '',
    phone: '',
    password: '',
    status: 'pending',
    visitingCard: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role === 'superuser') navigate('/dashboard')
      else navigate('/products')
    }
  }, [user, navigate])

  const signUp = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password)
    } catch {
      toast.error('Error!')
    }
  }

  const addUser = async (id, data) => {
    try {
      const docRef = doc(db, 'users', id)
      await setDoc(docRef, { ...data, created: serverTimestamp(), updated: serverTimestamp() })
    } catch {
      toast.error('Error!')
    }
  }

  const handleChange = e => {
    setFormData(state => ({ ...state, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const {
      role,
      firstName,
      lastName,
      company,
      gst,
      dob,
      email,
      phone,
      password,
      visitingCard,
      status,
    } = formData

    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`
    const id = (await signUp(email, password))?.user?.uid
    if (!id) return

    const userData = {
      role,
      firstName,
      lastName,
      company,
      gst,
      dob,
      email,
      phone: formattedPhone,
      status,
      visitingCard,
    }

    switch (status.toLowerCase()) {
      case "pending":
        userData.disclaimer = "Note: Users with a Pending status are not allowed to view product prices."
        break
      case "approved":
        userData.disclaimer = "Note: You are approved to view product prices."
        break
      case "rejected":
        userData.disclaimer = "Note: Your request has been rejected. You cannot view product prices."
        break
      default:
        userData.disclaimer = "Note: Please contact support to check your access status."
        break
    }

    await addUser(id, userData)

    await emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      userData,
      { publicKey: import.meta.env.VITE_PUBLIC_KEY }
    )

    toast.success('Signup successful!')
    setFormData({
      role: '',
      firstName: '',
      lastName: '',
      company: '',
      gst: '',
      dob: '',
      email: '',
      phone: '',
      password: '',
      status: 'pending',
      visitingCard: '',
    })
    navigate(`/dashboard`)
  }

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

              <div><label>First Name</label><input type="text" name="firstName" value={formData.firstName} placeholder="First Name" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>Last Name</label><input type="text" name="lastName" value={formData.lastName} placeholder="Last Name" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>Company Name</label><input type="text" name="company" value={formData.company} placeholder="Company Name" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>GST Number</label><input type="text" name="gst" value={formData.gst} placeholder="GST Number" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} /></div>
              <div><label>Date of Birth</label><input type="date" name="dob" value={formData.dob} className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>Phone</label><input type="tel" name="phone" value={formData.phone} placeholder="Phone" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>Email</label><input type="email" name="email" value={formData.email} placeholder="Email" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>Password</label><input type="password" name="password" value={formData.password} placeholder="Password" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} required /></div>
              <div><label>Visiting Card (optional)</label><input type="text" name="visitingCard" value={formData.visitingCard} placeholder="Visiting Card URL" className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary" onChange={handleChange} /></div>

              <button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">Sign up</button>
              <Link to="/signin" className="text-right">Sign in</Link>
            </form>
          </div>
        </section>
      </main>
    </>
  )
}

Signup.propTypes = {
  user: PropTypes.object
}

export default Signup
