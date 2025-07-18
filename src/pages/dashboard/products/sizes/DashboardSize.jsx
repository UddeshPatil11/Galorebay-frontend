import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardSize({ sizes }) {
	const [formData, setFormData] = useState({ size: '' })
	const navigate = useNavigate()
	const { id, sizeId } = useParams()

	const getSize = useCallback(async () => {
		try {
			const docRef = doc(db, 'products', id, 'sizes', sizeId)
			const snapshot = await getDoc(docRef)
			const { size } = snapshot.data()
			setFormData({ size })
		} catch {
			toast.error('Error!')
		}
	}, [id, sizeId])

	useEffect(() => {
		getSize()
	}, [getSize])

	const updateSize = async data => {
		try {
			const docRef = doc(db, 'products', id, 'sizes', sizeId)
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

		const { size } = formData
		const data = { size }

		await updateSize(data)

		setFormData({ size: '' })

		toast.success('Success!')
		navigate(`/dashboard/products/${id}/sizes`)
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1 mb-10">
						<div>
							<label>Size</label>
							<select
								name="size"
								value={formData.size}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{sizes.map((size, index) => (
									<option key={index} value={size.name}>
										{size.name}
									</option>
								))}
							</select>
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

DashboardSize.propTypes = {
	sizes: PropTypes.array
}

export default DashboardSize
