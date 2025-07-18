import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import FeaturedProduct from '../../components/FeaturedProduct'

function FeaturedProducts() {
	const [products] = useState([
		{
			id: 1,
			brand: 'Brand Name',
			model: 'Model Name',
			modelNo: '74847',
			image: '/images/1735878842.png'
		},
		{
			id: 2,
			brand: 'Brand Name',
			model: 'Model Name',
			modelNo: '74847',
			image: '/images/1735878840.png'
		},
		{
			id: 3,
			brand: 'Brand Name',
			model: 'Model Name',
			modelNo: '74847',
			image: '/images/1735878841.png'
		},
		{
			id: 4,
			brand: 'Brand Name',
			model: 'Model Name',
			modelNo: '74847',
			image: '/images/1735878841.png'
		}
	])

	return (
		<>
			<section>
				<div className="w-[95%] mx-auto py-16">
					<h2 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">
						Featured Products
					</h2>

					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						grabCursor={true}
						breakpoints={{
							1024: { slidesPerView: 3 }
						}}
						className="!overflow-visible mb-16"
					>
						{products.map((product, index) => (
							<SwiperSlide key={index}>
								<FeaturedProduct product={product} />
							</SwiperSlide>
						))}
					</Swiper>

					<div className="text-center">
						<Link
							to="/products"
							className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
						>
							View Full Range
						</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default FeaturedProducts
