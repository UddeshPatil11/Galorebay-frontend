import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'

function Size({ getSizes }) {
	const [formData, setFormData] = useState({ name: '' })
	const navigate = useNavigate()
	const { id } = useParams()

	const getSize = useCallback(async () => {
		try {
			const docRef = doc(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'sizes', id)
			const snapshot = await getDoc(docRef)
			const { name } = snapshot.data()
			setFormData(state => ({ ...state, name }))
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getSize()
	}, [getSize])

	const updateSize = async data => {
		try {
			const docRef = doc(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'sizes', id)
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

		await updateSize(data)
		await getSizes()

		setFormData({ name: '' })

		toast.success('Success!')
		navigate('/dashboard/attributes/sizes')
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

Size.propTypes = { getSizes: PropTypes.func }

export default Size
