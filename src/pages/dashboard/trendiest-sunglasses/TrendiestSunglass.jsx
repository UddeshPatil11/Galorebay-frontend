import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../utils/upload'
import { toast } from 'react-toastify'

function TrendiestSunglass({ getTrendiestSunglasses }) {
	const [formData, setFormData] = useState({ title: '', excerpt: '', viewMore: '', image: null })
	const navigate = useNavigate()
	const { id } = useParams()

	const getTrendiestSunglass = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'jXjwMzYMrDhttM1DnXqt', 'trendiest_sunglasses', id)
			const snapshot = await getDoc(docRef)
			const { title, excerpt, viewMore } = snapshot.data()
			setFormData(state => ({ ...state, title, excerpt, viewMore }))
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getTrendiestSunglass()
	}, [getTrendiestSunglass])

	const updateTrendiestSunglass = async data => {
		try {
			const docRef = doc(db, 'pages', 'jXjwMzYMrDhttM1DnXqt', 'trendiest_sunglasses', id)
			await updateDoc(docRef, {
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
		const data = { title, excerpt, viewMore }

		if (image) data.image = await upload(image)

		await updateTrendiestSunglass(data)
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
							Update
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

TrendiestSunglass.propTypes = { getTrendiestSunglasses: PropTypes.func }

export default TrendiestSunglass
