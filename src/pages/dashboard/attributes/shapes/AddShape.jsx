import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../../utils/upload'
import { toast } from 'react-toastify'

function AddShape({ getShapes }) {
	const [formData, setFormData] = useState({ name: '', image: null })
	const navigate = useNavigate()

	const addShape = async data => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'shapes')
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

	const handleFileChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.files[0] }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const { name, image } = formData
		const data = { name, image: image ? await upload(image) : '' }

		await addShape(data)
		await getShapes()

		setFormData({ name: '', image: null })
		e.target.reset()

		toast.success('Success!')
		navigate('/dashboard/attributes/shapes')
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
							<label>Image</label>
							<input
								type="file"
								name="image"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleFileChange}
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

AddShape.propTypes = { getShapes: PropTypes.func }

export default AddShape
