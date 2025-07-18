import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../utils/firebase'
import { collection, getDocs, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { MdClose } from 'react-icons/md'
import HeroSection from '../sections/HeroSection'

function Checkout({ user, carts, getCarts }) {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		company: '',
		email: '',
		phone: '',
		gst: '',
		address: '',
		message: ''
	})
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate('/signin')
		if (user.role === 'Salesperson') return

		const { firstName, lastName, company, email, phone } = user
		setFormData(state => ({ ...state, firstName, lastName, company, email, phone }))
	}, [user, navigate])

	const deleteCart = async id => {
		try {
			const docRef = doc(db, 'users', user.id, 'carts', id)
			await deleteDoc(docRef)
			await getCarts()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	const deleteCarts = async () => {
		try {
			const collectionRef = collection(db, 'users', user.id, 'carts')
			const snapshot = await getDocs(collectionRef)

			for (const snap of snapshot.docs) {
				const docRef = doc(db, 'users', user.id, 'carts', snap.id)
				await deleteDoc(docRef)
			}

			await getCarts()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	const addOrder = async data => {
		try {
			const collectionRef = collection(db, 'orders')
			const docRef = await addDoc(collectionRef, {
				...data,
				created: serverTimestamp(),
				updated: serverTimestamp()
			})

			const subcollectionRef = collection(docRef, 'carts')
			const promises = carts.map(cart => {
				delete cart.id
				return addDoc(subcollectionRef, {
					...cart,
					created: serverTimestamp(),
					updated: serverTimestamp()
				})
			})
			await Promise.all(promises)
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	const handleChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const { role, firstName: userFirstName, lastName: userLastName } = user
		const { firstName, lastName, company, email, phone, gst, address, message } = formData
		const data = { role, userFirstName, userLastName, firstName, lastName, company, email, phone, gst, address, message, status: 'pending' }
		await addOrder(data)

		data.products = carts
			.map(
				(cart, index) =>
					`Item ${index + 1}: \n${cart.brand} ${cart.model} ${cart.modelNo} \n${
						cart.price
					} \n${Object.entries(cart.colors)
						.map(([key, value]) => `${key} (${value})`)
						.join('\n')}`
			)
			.join('\n\n')

		await emailjs.send(import.meta.env.VITE_SERVICE_ID, 'template_y4yzg9d', data, {
			publicKey: import.meta.env.VITE_PUBLIC_KEY
		})

		await deleteCarts()

		setFormData({
			firstName: '',
			lastName: '',
			company: '',
			email: '',
			phone: '',
			gst: '',
			address: '',
			message: ''
		})

		navigate(`/products`)
	}

	if (!carts) return <>Loading...</>

	return (
		<>
			<Helmet>
				<title>Checkout</title>
			</Helmet>

			<main>
				<HeroSection />

				<section className="w-[85%] mx-auto py-16">
					<h1 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">Checkout</h1>

					<div className="flex flex-col lg:flex-row gap-16">
						<div className="lg:w-1/2">
							<h2 className="text-primary font-medium text-xl mb-5">Billing Details</h2>

							<form method="post" id="form" className="grid grid-cols-2 gap-5" onSubmit={handleSubmit}>
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

								<div className="col-span-2">
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

								<div className="col-span-2">
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

								<div className="col-span-2">
									<label>Address</label>
									<textarea
										name="address"
										value={formData.address}
										placeholder="Address"
										className="bg-white w-full h-20 rounded border py-1 px-3 outline-none focus:border-secondary"
										onChange={handleChange}
										required
									></textarea>
								</div>

								<div className="col-span-2">
									<label>Message</label>
									<textarea
										name="message"
										value={formData.message}
										placeholder="Message"
										className="bg-white w-full h-20 rounded border py-1 px-3 outline-none focus:border-secondary"
										onChange={handleChange}
										required
									></textarea>
								</div>
							</form>
						</div>
						<div className="lg:w-1/2 flex flex-col">
							<h2 className="text-primary font-medium text-xl mb-5">Your Order</h2>

							<div className="mb-5">
								<div className="text-white bg-secondary font-medium flex flex-col lg:flex-row">
									<div className="lg:w-2/12 p-2 border">Image</div>
									<div className="lg:w-4/12 p-2 border">Product</div>
									<div className="lg:w-4/12 p-2 border">Color w/ Quantity</div>
									<div className="lg:w-2/12 p-2 border">Actions</div>
								</div>
								{carts.map((cart, index) => (
									<div key={index} className="flex flex-col md:flex-row">
										<div className="lg:w-2/12 p-2 border flex items-center">
											<img src={cart.image} alt="" />
										</div>
										<div className="lg:w-4/12 p-2 border flex items-center">
											{cart.brand} {cart.model} {cart.modelNo} <br /> ₹{cart.price}
										</div>
										<div className="lg:w-4/12 p-2 border">
											{Object.entries(cart.colors).map(([key, value], index) => (
												<div key={index} className="flex">
													<div className="basis-2/3 p-1 border">{key}</div>
													<div className="basis-1/3 p-1 border">{value}</div>
												</div>
											))}
										</div>
										<div className="lg:w-2/12 p-2 border flex items-center justify-center">
											<button
												className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
												onClick={() => deleteCart(cart.id)}
											>
												<MdClose />
											</button>
										</div>
									</div>
								))}
							</div>

							<button
								type="submit"
								form="form"
								className="text-white bg-secondary font-medium px-7 py-3 rounded-full mt-auto"
							>
								Submit Query
							</button>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

Checkout.propTypes = { user: PropTypes.object, carts: PropTypes.array, getCarts: PropTypes.func }

export default Checkout
