import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../utils/upload'
import { toast } from 'react-toastify'

function DashboardBrand({ getBrands }) {
	const [formData, setFormData] = useState({ name: '', image: null, productImage: null, heroImage: null })
	const navigate = useNavigate()
	const { id } = useParams()

	const getBrand = useCallback(async () => {
		try {
			const docRef = doc(db, 'brands', id)
			const snapshot = await getDoc(docRef)
			const { name } = snapshot.data()
			setFormData(state => ({ ...state, name }))
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getBrand()
	}, [getBrand])

	const updateBrand = async data => {
		try {
			const docRef = doc(db, 'brands', id)
			await updateDoc(docRef, { ...data, updated: serverTimestamp() })
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
		const data = { name }

		if (image) data.image = await upload(image)
		if (productImage) data.productImage = await upload(productImage)
		if (heroImage) data.heroImage = await upload(heroImage)

		await updateBrand(data)
		await getBrands()

		// setFormData({ name: '', image: null, productImage: null, heroImage: null })
		// e.target.reset()

		toast.success('Success!')
		navigate('/dashboard/brands')
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1 mb-10">
						<div>
						<div>
							<label>Hero Image</label>
							<input
								type="file"
								name="heroImage"
								onChange={handleFileChange}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
							/>
						</div>

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
							Update
						</button>
					</form>

					<Link
						to="models"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Models
					</Link>
				</section>
			</main>
		</>
	)
}

DashboardBrand.propTypes = { getBrands: PropTypes.func }

export default DashboardBrand
