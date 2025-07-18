import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import upload from '../../../utils/upload'
import { toast } from 'react-toastify'

function DashboardAddPost({ getPosts }) {
	const [formData, setFormData] = useState({
		metaTitle: '',
		metaDescription: '',
		title: '',
		excerpt: '',
		description: '',
		image: null
	})
	const navigate = useNavigate()

	const addPost = async data => {
		try {
			const collectionRef = collection(db, 'posts')
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

		const { metaTitle, metaDescription, title, excerpt, description, image } = formData
		const data = {
			metaTitle,
			metaDescription,
			title,
			excerpt,
			description,
			image: image ? await upload(image) : ''
		}

		await addPost(data)
		await getPosts()

		setFormData({
			metaTitle: '',
			metaDescription: '',
			title: '',
			excerpt: '',
			description: '',
			image: null
		})
		e.target.reset()

		toast.success('Success!')
		navigate('/dashboard/posts')
	}

	return (
		<>
			<main>
				<section>
					<form method="post" onSubmit={handleSubmit} className="flex flex-col gap-1">
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
							<label>Title</label>
							<input
								type="text"
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
							<textarea
								name="excerpt"
								value={formData.excerpt}
								placeholder="Excerpt"
								className="bg-white w-full h-20 rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
							/>
						</div>

						<div>
							<label>Description</label>
							<textarea
								name="description"
								value={formData.description}
								placeholder="Description"
								className="bg-white w-full h-20 rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
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

DashboardAddPost.propTypes = { getPosts: PropTypes.func }

export default DashboardAddPost
