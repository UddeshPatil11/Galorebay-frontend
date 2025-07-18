import PropTypes from 'prop-types'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/navigation'

function TrendiestSunglasses({ page, trendiestSunglasses }) {
	const swiper1Ref = useRef(null)
	const swiper2Ref = useRef(null)

	return (
		<>
			<section id="trendiestSunglasses" className="text-center w-[95%] md:w-[80%] mx-auto py-12 relative">
				<div className="bg-[#F9F9FF] w-full aspect-square rounded-full absolute top-12 left-1/2 -translate-x-1/2 -z-10"></div>
				<h2 className="text-primary font-medium text-3xl mb-3 lg:text-7xl">{page.featuredTitle}</h2>
				<p className="font-light text-xl mb-10">{page.featuredSubtitle}</p>

				<Swiper
					modules={[Navigation]}
					onSwiper={swiper => (swiper1Ref.current = swiper)}
					initialSlide={2}
					slidesPerView="1.5"
					spaceBetween={0}
					grabCursor={true}
					centeredSlides={true}
					// loop={true}
					simulateTouch={false}
					allowTouchMove={false}
					breakpoints={{
						1024: { slidesPerView: 3 }
					}}
					className="mb-10 md:mb-20 swiper-1"
				>
					{trendiestSunglasses.map((slide, index) => (
						<SwiperSlide key={index} className="!h-auto !flex flex-col justify-center">
							<img src={slide.image} alt="" className="scale-50" />
						</SwiperSlide>
					))}
				</Swiper>

				<img
					src="/images/1739360637-prev.svg"
					alt=""
					onClick={() => {
						swiper1Ref.current?.slidePrev()
						swiper2Ref.current?.slidePrev()
					}}
					className="cursor-pointer w-10 absolute top-1/3 -left-2 z-10 md:w-12 md:top-1/2 md:-left-10"
				/>
				<img
					src="/images/1739360637-next.svg"
					alt=""
					onClick={() => {
						swiper1Ref.current?.slideNext()
						swiper2Ref.current?.slideNext()
					}}
					className="cursor-pointer w-10 absolute top-1/3 -right-2 z-10 md:w-12 md:top-1/2 md:-right-10"
				/>

				<Swiper
					modules={[Navigation]}
					onSwiper={swiper => (swiper2Ref.current = swiper)}
					initialSlide={2}
					slidesPerView={1.5}
					spaceBetween={10}
					grabCursor={true}
					centeredSlides={true}
					// loop={true}
					simulateTouch={false}
					allowTouchMove={false}
					breakpoints={{
						1024: { slidesPerView: 5, spaceBetween: 30 }
					}}
					className="swiper-2"
					ref={swiper2Ref}
				>
					{trendiestSunglasses.map((slide, index) => (
						<SwiperSlide key={index} className="!h-auto !flex flex-col justify-center">
							<div className="text-white bg-secondary bg-opacity-70 rounded-full px-5 py-5 flex flex-col items-center">
								<h3 className="font-semibold mb-1">{slide.title}</h3>
								<p className="font-medium text-xs">{slide.excerpt}</p>
								<Link
									to={slide.viewMore}
									className="text-xs border border-white px-3 py-1 rounded-full hidden items-center gap-3 mt-3"
								>
									View More
									<img src="/images/1735878960.svg" alt="" className="max-w-2" />
								</Link>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</section>
		</>
	)
}

TrendiestSunglasses.propTypes = { page: PropTypes.object, trendiestSunglasses: PropTypes.array }

export default TrendiestSunglasses
