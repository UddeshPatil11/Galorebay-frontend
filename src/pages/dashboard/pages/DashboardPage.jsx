import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import upload from '../../../utils/upload'

function DashboardPage({ getPages }) {
	const [formData, setFormData] = useState({ 
		metaTitle: '', 
		metaDescription: '', 
		title: '',
		heroImage: null
	})
	const navigate = useNavigate()
	const { id } = useParams()

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', id)
			const snapshot = await getDoc(docRef)
			const { metaTitle, metaDescription, title } = snapshot.data()
			setFormData(state => ({ ...state, metaTitle, metaDescription, title }))
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getPage()
	}, [getPage])

	const updatePage = async data => {
		try {
			const docRef = doc(db, 'pages', id)
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

		const { metaTitle, metaDescription, title, heroImage } = formData
		const data = { metaTitle, metaDescription, title }

		if (heroImage) data.heroImage = await upload(heroImage)

		await updatePage(data)
		await getPages()

		// setFormData({ metaTitle: '', metaDescription: '', title: '', heroImage: null })
		// e.target.reset()

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
							Update
						</button>
					</form>
				</section>
			</main>
		</>
	)
}

DashboardPage.propTypes = { getPages: PropTypes.func }

export default DashboardPage
