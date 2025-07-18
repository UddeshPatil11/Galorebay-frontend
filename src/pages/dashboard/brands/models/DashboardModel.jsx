import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardModel() {
	const [formData, setFormData] = useState({ name: '' })
	const navigate = useNavigate()
	const { id, modelId } = useParams()

	const getModel = useCallback(async () => {
		try {
			const docRef = doc(db, 'brands', id, 'models', modelId)
			const snapshot = await getDoc(docRef)
			const { name } = snapshot.data()
			setFormData({ name })
		} catch {
			toast.error('Error!')
		}
	}, [id, modelId])

	useEffect(() => {
		getModel()
	}, [getModel])

	const updateModel = async data => {
		try {
			const docRef = doc(db, 'brands', id, 'models', modelId)
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

		const { name } = formData
		const data = { name }

		await updateModel(data)

		setFormData({ name: '' })

		toast.success('Success!')
		navigate(`/dashboard/brands/${id}/models`)
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

						<button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
							Update
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

export default DashboardModel
