import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'

function Brands({ brands }) {
	const [page, setPage] = useState({})

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'KZFH7ZXQeFCdRvbfu9SX')
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

				<section className="w-[85%] mx-auto my-16">
					<h1 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">Brands</h1>

					<div className="grid grid-cols-2 lg:grid-cols-4">
						{brands.map((brand, index) => (
							<Link
								key={index}
								to={brand.id}
								className="px-5 py-10 border flex items-center justify-center"
							>
								<img src={brand.image} alt="" className="max-h-12" />
							</Link>
						))}
					</div>
				</section>
			</main>
		</>
	)
}

Brands.propTypes = { brands: PropTypes.array }

export default Brands
