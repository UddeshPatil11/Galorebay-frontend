import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardAddContact({ getContacts }) {
	const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
	const navigate = useNavigate()

	const addContact = async data => {
		try {
			const collectionRef = collection(db, 'contacts')
			await addDoc(collectionRef, {
				...data,
				created: serverTimestamp(),
				updated: serverTimestamp()
			})
		} catch {
			toast.error('Error!')
		}
	}

	const handleChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const { name, phone, email, message } = formData
		const data = { name, phone, email, message }

		await addContact(data)
		await getContacts()

		setFormData({ name: '', phone: '', email: '', message: '' })

		toast.success('Success!')
		navigate('/dashboard/contacts')
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1">
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

						<button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
							Add
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

DashboardAddContact.propTypes = { getContacts: PropTypes.func }

export default DashboardAddContact
