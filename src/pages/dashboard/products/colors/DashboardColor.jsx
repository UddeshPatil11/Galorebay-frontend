import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardColor() {
	const [formData, setFormData] = useState({ name: '', quantity: 0 })
	const navigate = useNavigate()
	const { id, colorId } = useParams()

	const getColor = useCallback(async () => {
		try {
			const docRef = doc(db, 'products', id, 'colors', colorId)
			const snapshot = await getDoc(docRef)
			const { name, quantity } = snapshot.data()
			setFormData({ name, quantity })
		} catch {
			toast.error('Error!')
		}
	}, [id, colorId])

	useEffect(() => {
		getColor()
	}, [getColor])

	const updateColor = async data => {
		try {
			const docRef = doc(db, 'products', id, 'colors', colorId)
			await updateDoc(docRef, { ...data, updated: serverTimestamp() })
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

		await updateColor(data)

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
							Update
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

export default DashboardColor
