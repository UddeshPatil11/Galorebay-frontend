import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../utils/upload'
import { toast } from 'react-toastify'

function DashboardAddBrand({ getBrands }) {
	const [formData, setFormData] = useState({ name: '', image: null, productImage: null, heroImage: null })
	const navigate = useNavigate()

	const addBrand = async data => {
		try {
			const collectionRef = collection(db, 'brands')
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

		const { name, image, productImage, heroImage } = formData
		const data = {
			name,
			image: image ? await upload(image) : '',
			productImage: productImage ? await upload(productImage) : '',
			heroImage: heroImage ? await upload(heroImage) : ''
		}

		await addBrand(data)
		await getBrands()

		setFormData({ name: '', image: null, productImage: null, heroImage: null })
		e.target.reset()

		toast.success('Success!')
		navigate('/dashboard/brands')
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1">
						<div>
							<label>Hero Image</label>
							<input
								type="file"
								name="heroImage"
								onChange={handleFileChange}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
							/>
						</div>

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

						<div>
							<label>Product Image</label>
							<input
								type="file"
								name="productImage"
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

DashboardAddBrand.propTypes = { getBrands: PropTypes.func }

export default DashboardAddBrand
