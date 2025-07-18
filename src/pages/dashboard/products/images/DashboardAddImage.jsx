import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../../utils/upload'
import { toast } from 'react-toastify'

function DashboardAddImage() {
	const [formData, setFormData] = useState({ image: null })
	const navigate = useNavigate()
	const { id } = useParams()

	const addImage = async data => {
		try {
			const collectionRef = collection(db, 'products', id, 'images')
			await addDoc(collectionRef, {
				...data,
				created: serverTimestamp(),
				updated: serverTimestamp()
			})
		} catch {
			toast.error('Error!')
		}
	}

	const handleFileChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.files[0] }))
	}

	const handleSubmit = async e => {
		e.preventDefault()

		const { image } = formData
		const data = { image: image ? await upload(image) : '' }

		await addImage(data)

		setFormData({ image: null })
		e.target.reset()

		toast.success('Success!')
		navigate(`/dashboard/products/${id}/images`)
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1 mb-10">
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

export default DashboardAddImage
