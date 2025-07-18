import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { CiSearch } from 'react-icons/ci'
import HeroSection from '../sections/HeroSection'

function Posts({ posts }) {
	const [page, setPage] = useState({})

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'pGiPVReahzYDyYvxfySZ')
			const snapshot = await getDoc(docRef)
			const data = snapshot.data()
			setPage(data)
		} catch {
			toast.error('Error!')
		}
	}, [])

	useEffect(() => {
		getPage()
	}, [getPage])

	return (
		<>
			<Helmet>
				<title>{page.metaTitle}</title>
				<meta name="description" content={page.metaDescription} />
			</Helmet>

			<main>
				<HeroSection heroImage={page.heroImage} />

				<section>
					<div className="w-[85%] mx-auto py-16 flex flex-col gap-16 lg:flex-row">
						<div className="lg:w-2/3">
							<div className="flex flex-col gap-16">
								{posts.map((post, index) => (
									<article key={index} className="flex flex-col gap-3">
										<img src={post.image} alt="" className="w-full h-96 object-cover" />
										<p className="text-gray-600">
											{new Date(post.updated.seconds * 1000).toLocaleDateString('en-US', {
												year: 'numeric',
												month: 'long',
												day: 'numeric'
											})}{' '}
											| Posted by Galorebay Optix
										</p>
										<h2 className="font-medium text-xl">{post.title}</h2>
										<p className="text-gray-600 text-justify line-clamp-3">{post.excerpt}</p>
										<Link to={post.id} className="font-medium underline">
											READ MORE
										</Link>
									</article>
								))}
							</div>
						</div>

						<div className="lg:w-1/3">
							<div className="flex items-center">
								<input
									type="search"
									placeholder="SEARCH POST"
									className="bg-white w-full rounded py-1 outline-none focus:border-secondary"
								/>
								<CiSearch className="text-2xl" />
							</div>
							<hr className="mb-10" />
							<h2 className="font-medium text-lg uppercase">Categories</h2>
							<hr className="mt-5 mb-10" />
							<h2 className="font-medium text-lg uppercase">Recent Articles</h2>
							<hr className="mt-5 mb-10" />
							<div className="flex flex-col gap-5">
								{posts.map((post, index) => (
									<Link to={post.id} key={index} className="flex items-center gap-3">
										<div className="w-1/3">
											<img src={post.image} alt="" className="w-full aspect-square object-cover" />
										</div>
										<div className="w-2/3">
											<p className="text-gray-600 mb-1">
												{new Date(post.updated.seconds * 1000).toLocaleDateString('en-US', {
													year: 'numeric',
													month: 'long',
													day: 'numeric'
												})}
											</p>
											<h2 className="font-medium">{post.title}</h2>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

Posts.propTypes = { posts: PropTypes.array }

export default Posts
