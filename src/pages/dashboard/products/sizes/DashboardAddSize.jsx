import PropTypes from 'prop-types'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardAddSize({ sizes }) {
	const [formData, setFormData] = useState({ size: '' })
	const navigate = useNavigate()
	const { id } = useParams()

	const addSize = async data => {
		try {
			const collectionRef = collection(db, 'products', id, 'sizes')
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

		const { size } = formData
		const data = { size }

		await addSize(data)

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
							Add
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

DashboardAddSize.propTypes = {
	sizes: PropTypes.array
}

export default DashboardAddSize
