import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../utils/upload'
import { toast } from 'react-toastify'

function AddTrendiestSunglass({ getTrendiestSunglasses }) {
	const [formData, setFormData] = useState({ title: '', excerpt: '', viewMore: '', image: null })
	const navigate = useNavigate()

	const addTrendiestSunglass = async data => {
		try {
			const collectionRef = collection(db, 'pages', 'jXjwMzYMrDhttM1DnXqt', 'trendiest_sunglasses')
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

		const { title, excerpt, viewMore, image } = formData
		const data = { title, excerpt, viewMore, image: image ? await upload(image) : '' }

		await addTrendiestSunglass(data)
		await getTrendiestSunglasses()

		setFormData({ title: '', excerpt: '', viewMore: '', image: null })
		e.target.reset()

		toast.success('Success!')
		navigate('/dashboard/trendiest-sunglasses')
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1">
						<div>
							<label>Title</label>
							<input
								name="title"
								value={formData.title}
								placeholder="Title"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Excerpt</label>
							<input
								name="excerpt"
								value={formData.excerpt}
								placeholder="Excerpt"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>View More</label>
							<input
								name="viewMore"
								value={formData.viewMore}
								placeholder="View More"
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

AddTrendiestSunglass.propTypes = { getTrendiestSunglasses: PropTypes.func }

export default AddTrendiestSunglass
