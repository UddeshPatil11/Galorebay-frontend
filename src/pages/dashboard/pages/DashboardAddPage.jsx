import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import upload from '../../../utils/upload'

function DashboardAddPage({ getPages }) {
	const [formData, setFormData] = useState({ 
		metaTitle: '',
		metaDescription: '',
		title: '',
		heroImage: null
	})
	const navigate = useNavigate()

	const addPage = async data => {
		try {
			const collectionRef = collection(db, 'pages')
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

		const { metaTitle, metaDescription, title, heroImage } = formData
		const data = { 
			metaTitle, 
			metaDescription, 
			title, 
			heroImage: heroImage ? await upload(heroImage) : '' 
		}

		await addPage(data)
		await getPages()

		setFormData({ metaTitle: '', metaDescription: '', title: '', heroImage: null })
		e.target.reset()

		toast.success('Success!')
		navigate('/dashboard/pages')
	}

	return (
		<>
			<main>
				<section>
					<form method="page" onSubmit={handleSubmit} className="flex flex-col gap-1">
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
								name="title"
								value={formData.title}
								placeholder="Title"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Hero Image</label>
							<input
								type="file"
								name="heroImage"
								onChange={handleFileChange}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
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

DashboardAddPage.propTypes = { getPages: PropTypes.func }

export default DashboardAddPage
