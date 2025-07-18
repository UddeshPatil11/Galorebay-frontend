import PropTypes from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Product from '../../components/Product'
import { Link } from 'react-router-dom'

function BestSellers({ products }) {
	return (
		<>
			<section>
				<div className="w-[90%] mx-auto py-16">
					<h2 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">
						Best Sellers
					</h2>

					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						grabCursor={true}
						breakpoints={{
							1024: { slidesPerView: 4 }
						}}
						className="!overflow-visible mb-16"
					>
						{products.map((product, index) => (
							<SwiperSlide key={index}>
								<Product product={product} />
							</SwiperSlide>
						))}
					</Swiper>

					<div className="text-center mb-16">
						<Link
							to="#"
							className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
						>
							View Full Range
						</Link>
					</div>

					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						grabCursor={true}
						breakpoints={{
							1024: { slidesPerView: 4 }
						}}
						className="!overflow-visible mb-16"
					>
						{products.map((product, index) => (
							<SwiperSlide key={index}>
								<Product product={product} />
							</SwiperSlide>
						))}
					</Swiper>

					<div className="text-center">
						<Link
							to="#"
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

BestSellers.propTypes = { products: PropTypes.array }

export default BestSellers
