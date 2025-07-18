import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../utils/upload'
import { toast } from 'react-toastify'

function DashboardAddProduct({ getProducts, brands, types, shapes, sizes, genders, materials }) {
	const [formData, setFormData] = useState({
		metaTitle: '',
		metaDescription: '',
		brand: '',
		category: '',
		model: '',
		modelNo: '',
		price: '',
		type: '',
		shape: '',
		// size: '',
		gender: '',
		material: '',
		description: '',
		image: null
	})
	const navigate = useNavigate()

	const addProduct = async data => {
		try {
			const collectionRef = collection(db, 'products')
			return await addDoc(collectionRef, {
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

		const {
			metaTitle,
			metaDescription,
			brand,
			category,
			model,
			modelNo,
			price,
			type,
			shape,
			// size,
			gender,
			material,
			description,
			image
		} = formData
		const data = {
			metaTitle,
			metaDescription,
			brand,
			category,
			model,
			modelNo,
			price,
			type,
			shape,
			// size,
			gender,
			material,
			description,
			image: image ? await upload(image) : ''
		}

		const product = await addProduct(data)
		await getProducts()

		setFormData({
			metaTitle: '',
			metaDescription: '',
			brand: '',
			category: '',
			model: '',
			modelNo: '',
			price: '',
			type: '',
			shape: '',
			// size: '',
			gender: '',
			material: '',
			description: '',
			image: null
		})
		e.target.reset()

		toast.success('Success!')
		navigate(`/dashboard/products/${product.id}`)
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1 mb-10">
						<div>
							<label>Meta Title</label>
							<input
								name="metaTitle"
								value={formData.metaTitle}
								placeholder="Meta Title"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Meta Description</label>
							<input
								name="metaDescription"
								value={formData.metaDescription}
								placeholder="Meta Description"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Brand</label>
							<select
								name="brand"
								value={formData.brand}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{brands.map((brand, index) => (
									<option key={index} value={brand.name}>
										{brand.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>Category</label>
							<select
								name="category"
								value={formData.category}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{brands
									.find(brand => brand.name == formData.brand)
									?.models.map((category, index) => (
										<option key={index} value={category.name}>
											{category.name}
										</option>
									))}
							</select>
						</div>

						<div>
							<label>Model</label>
							<input
								type="text"
								name="model"
								value={formData.model}
								placeholder="Model"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Model No</label>
							<input
								type="text"
								name="modelNo"
								value={formData.modelNo}
								placeholder="Model No"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Price</label>
							<input
								type="number"
								name="price"
								value={formData.price}
								placeholder="Price"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Type</label>
							<select
								name="type"
								value={formData.type}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{types.map((type, index) => (
									<option key={index} value={type.name}>
										{type.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>Shape</label>
							<select
								name="shape"
								value={formData.shape}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{shapes.map((shape, index) => (
									<option key={index} value={shape.name}>
										{shape.name}
									</option>
								))}
							</select>
						</div>

						{/* <div>
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
						</div> */}

						<div>
							<label>Gender</label>
							<select
								name="gender"
								value={formData.gender}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{genders.map((gender, index) => (
									<option key={index} value={gender.name}>
										{gender.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>Material</label>
							<select
								name="material"
								value={formData.material}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							>
								<option></option>
								{materials.map((material, index) => (
									<option key={index} value={material.name}>
										{material.name}
									</option>
								))}
							</select>
						</div>

						<div>
							<label>Terms & Conditions</label>
							<textarea
								name="description"
								value={formData.description}
								placeholder="Terms & Conditions"
								className="bg-white w-full h-20 rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
							></textarea>
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

					<div className="flex items-center gap-2">
						<div className="flex items-center gap-2">
							<Link className="text-white bg-secondary bg-opacity-75 cursor-not-allowed font-medium inline-block px-7 py-3 rounded-full">
								Sizes
							</Link>
							<Link className="text-white bg-secondary bg-opacity-75 cursor-not-allowed font-medium inline-block px-7 py-3 rounded-full">
								Colors
							</Link>
							<Link className="text-white bg-secondary bg-opacity-75 cursor-not-allowed font-medium inline-block px-7 py-3 rounded-full">
								Images
							</Link>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

DashboardAddProduct.propTypes = {
	getProducts: PropTypes.func,
	brands: PropTypes.array,
	types: PropTypes.array,
	shapes: PropTypes.array,
	sizes: PropTypes.array,
	genders: PropTypes.array,
	materials: PropTypes.array
}

export default DashboardAddProduct
