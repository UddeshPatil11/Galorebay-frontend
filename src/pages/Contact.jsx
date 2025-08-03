import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../utils/firebase'
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { IoIosArrowForward } from 'react-icons/io'
import HeroSection from '../sections/HeroSection'

function Contact() {
	const [page, setPage] = useState({})

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'yhLSFPMAzuU8ZDL3gu6p')
			const snapshot = await getDoc(docRef)
			const data = snapshot.data()
			setPage(data)
		} catch {
			toast.error('Error!')
		}
	}, [])

	useEffect(() => {
		getPage()
	}, [getPage])

	const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })

	const handleChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.value }))
	}

	const addContact = async data => {
		const collectionRef = collection(db, 'contacts')
		await addDoc(collectionRef, {
			...data,
			created: serverTimestamp(),
			updated: serverTimestamp()
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const { name, phone, email, message } = formData
			const data = { name, phone, email, message }

			await addContact(data)

			// await emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, data, {
			// 	publicKey: import.meta.env.VITE_PUBLIC_KEY
			// })

			setFormData({ name: '', phone: '', email: '', message: '' })
			e.target.reset()

			toast.success('Success!')
		} catch (error) {
			console.log(error)
			toast.error('Error!')
		}
	}

	return (
		<>
			<Helmet>
				<title>{page.metaTitle}</title>
				<meta name="description" content={page.metaDescription} />
			</Helmet>

			<main>
				<HeroSection heroImage={page.heroImage} />

				<section>
					<div className="w-[85%] mx-auto py-16 flex flex-col gap-20 lg:flex-row">
						<div className="lg:w-3/5">
							<p className="flex items-center gap-2 mb-2">
								<Link to="/">Home</Link> <IoIosArrowForward /> <Link to="/contact">Contact Us</Link>
							</p>
							<h1 className="text-primary font-medium text-3xl mb-10 lg:text-5xl">Contact Us</h1>
							<form method="post" className="flex flex-col gap-2" onSubmit={handleSubmit}>
								<div>
									<label>Name</label>
									<input
										type="text"
										name="name"
										value={formData.name}
										placeholder="Name"
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

								<button className="text-white bg-secondary font-medium self-start px-7 py-3 rounded-full">
									Send
								</button>
							</form>
						</div>

						<div className="lg:w-2/5">
							<div className="bg-[#ECECEC] p-10 shadow-[0_0_12px_-5px_#00000040]">
								<h2 className="font-medium text-xl mb-3">Please Do Get In Touch!</h2>
								<p className="mb-2">
									We&apos;d love to hear from you - Please use the form to send us your message or ideas.
								</p>
								<p className="mb-10">
									1/33, Second Floor, Mall Road, Tilak Nagar, New Delhi - 110018 (INDIA)
								</p>
								<p>
									Email:
									<Link to="mailto:info@galorebayoptix.com">info@galorebayoptix.com</Link>
								</p>
								<p>
									Contact Number: <Link to="tel:+916363406363">+91 6363 40 6363</Link>
								</p>
								<hr className="border-gray-300 my-10" />
								<h3 className="font-medium mb-3">OPENING HOURS:</h3>
								<p>Thursday To Tuesday 10:00 Am To 7:00 Pm</p>
								{/* <p>Sundays: Closed</p> */}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default Contact
