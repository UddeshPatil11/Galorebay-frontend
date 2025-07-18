import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardAddColor() {
	const [formData, setFormData] = useState({ name: '', quantity: 0 })
	const navigate = useNavigate()
	const { id } = useParams()

	const addColor = async data => {
		try {
			const collectionRef = collection(db, 'products', id, 'colors')
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

		const { name, quantity } = formData
		const data = { name, quantity }

		await addColor(data)

		setFormData({ name: '', quantity: 0 })

		toast.success('Success!')
		navigate(`/dashboard/products/${id}/colors`)
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1 mb-10">
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
							<label>Quantity</label>
							<input
								type="number"
								name="quantity"
								value={formData.quantity}
								placeholder="Quantity"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
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

export default DashboardAddColor
