import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/home/HeroSection'
import TrendiestSunglasses from '../sections/home/TrendiestSunglasses'
import Brands from '../sections/home/Brands'
import BrandProducts from '../sections/home/BrandProducts'
// import OfferBanner from '../sections/home/OfferBanner'
// import FeaturedProducts from '../sections/home/FeaturedProducts'

function Home({ trendiestSunglasses, brands }) {
	const [page, setPage] = useState({})

	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'jXjwMzYMrDhttM1DnXqt')
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
				<HeroSection page={page} />
				<TrendiestSunglasses page={page} trendiestSunglasses={trendiestSunglasses} />
				<Brands brands={brands} />

				<section>
					<div className="w-[90%] mx-auto py-16 flex flex-col gap-16">
						<BrandProducts
							id="gJGJC8HhGM3qs4oNBcU6"
							brand="Feather"
							image="/images/1739293636-feather.png"
						/>
						<BrandProducts
							id="t4za1jq2CAcApBo8A5Ma"
							brand="Galorebay"
							image="/images/1739293690-galorebay.png"
						/>
						<BrandProducts
							id="6AIaM7zQkhzRHOi6bFrQ"
							brand="John Karter"
							image="/images/1739293727-john-karter.png"
						/>
						<BrandProducts
							id="5jxUhiQo8vX1plXwwIke"
							brand="Kidstar"
							image="/images/1739293752-kidstar.png"
						/>
						<BrandProducts id="vtHx7AH5WJyIqI2IoKC8" brand="Caron" image="/images/1739293795-caron.png" />
						<BrandProducts
							id="TM1h7whl3XDdpy35fJgL"
							brand="Red Grapes"
							image="/images/1739293804-red-grapes.png"
						/>
						<BrandProducts
							id="UWSwW3FxGnzavZ6eyRGi"
							brand="Cashier"
							image="/images/1739293816-cashier-deluxe.png"
						/>
					</div>
				</section>

				{/* <OfferBanner /> */}
				{/* <FeaturedProducts products={products} /> */}
			</main>
		</>
	)
}

Home.propTypes = {
	trendiestSunglasses: PropTypes.array,
	brands: PropTypes.array,
	products: PropTypes.array
}

export default Home
