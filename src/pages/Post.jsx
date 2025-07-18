import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'

function Post() {
	const { id } = useParams()
	const [post, setPost] = useState({})

	const getPost = useCallback(async () => {
		try {
			const docRef = doc(db, 'posts', id)
			const snapshot = await getDoc(docRef)
			const { title, excerpt, description, image } = snapshot.data()
			setPost(state => ({ ...state, title, excerpt, description, image }))
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getPost()
	}, [getPost])

	return (
		<>
			<Helmet>
				<title>{post.metaTitle}</title>
				<meta name="description" content={post.metaDescription} />
			</Helmet>

			<main>
				<HeroSection />

				<section className="w-[85%] mx-auto my-16 flex flex-col gap-16">
					<h1 className="text-primary font-medium text-3xl text-center lg:text-5xl">{post.title}</h1>

					<img src={post.image} alt="" className="rounded-lg" />

					<p className="text-justify">{post.description}</p>
				</section>
			</main>
		</>
	)
}

export default Post
