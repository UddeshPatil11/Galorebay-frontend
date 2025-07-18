import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import upload from '../../../../utils/upload'

function Home() {
	const [formData, setFormData] = useState({
		heroTitle: '',
		heroSubtitle: '',
		heroVideo: '',
		heroImage: null,
		featuredTitle: '',
		featuredSubtitle: '',
		offerBanner: null
	})
	const navigate = useNavigate()

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'jXjwMzYMrDhttM1DnXqt')
			const snapshot = await getDoc(docRef)
			const { heroTitle, heroSubtitle, heroVideo, featuredTitle, featuredSubtitle } = snapshot.data()
			setFormData(state => ({
				...state,
				heroTitle,
				heroSubtitle,
				heroVideo,
				featuredTitle,
				featuredSubtitle
			}))
		} catch {
			toast.error('Error!')
		}
	}, [])

	useEffect(() => {
		getPage()
	}, [getPage])

	const updatePage = async data => {
		try {
			const docRef = doc(db, 'pages', 'jXjwMzYMrDhttM1DnXqt')
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

		const {
			heroTitle,
			heroSubtitle,
			heroVideo,
			heroImage,
			featuredTitle,
			featuredSubtitle,
			offerBanner
		} = formData
		const data = { heroTitle, heroSubtitle, heroVideo, featuredTitle, featuredSubtitle }

		if (heroImage) data.heroImage = await upload(heroImage)
		if (offerBanner) data.offerBanner = await upload(offerBanner)

		await updatePage(data)

		toast.success('Success!')
		navigate('/dashboard/pages/home')
	}

	return (
		<>
			<main>
				<section>
					<form method="page" onSubmit={handleSubmit} className="flex flex-col gap-1 mb-10">
						<div>
							<label>Hero Title</label>
							<input
								name="heroTitle"
								value={formData.heroTitle}
								placeholder="Hero Title"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Hero Subtitle</label>
							<input
								name="heroSubtitle"
								value={formData.heroSubtitle}
								placeholder="Hero Subtitle"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Hero Video</label>
							<input
								name="heroVideo"
								placeholder="YT Video ID"
								value={formData.heroVideo}
								onChange={handleChange}
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
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

						<div>
							<label>Featured Title</label>
							<input
								name="featuredTitle"
								value={formData.featuredTitle}
								placeholder="Featured Title"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Featured Subtitle</label>
							<input
								name="featuredSubtitle"
								value={formData.featuredSubtitle}
								placeholder="Featured Subtitle"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleChange}
								required
							/>
						</div>

						<div>
							<label>Offer Banner</label>
							<input
								type="file"
								name="offerBanner"
								className="bg-white w-full rounded border py-1 px-3 outline-none focus:border-secondary"
								onChange={handleFileChange}
							/>
						</div>

						<button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
							Update
						</button>
					</form>

					<Link
						to="/dashboard/trendiest-sunglasses"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Trendiest Sunglasses
					</Link>
				</section>
			</main>
		</>
	)
}

export default Home
