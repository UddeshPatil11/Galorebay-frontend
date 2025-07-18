import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function AddColor({ getColors }) {
	const [formData, setFormData] = useState({ name: '' })
	const navigate = useNavigate()

	const addColor = async data => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'colors')
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

		const { name } = formData
		const data = { name }

		await addColor(data)
		await getColors()

		setFormData({ name: '' })

		toast.success('Success!')
		navigate('/dashboard/attributes/colors')
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

						<button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
							Add
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

AddColor.propTypes = { getColors: PropTypes.func }

export default AddColor
