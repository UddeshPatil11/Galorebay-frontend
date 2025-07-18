import PropTypes from 'prop-types'
import { useState, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import CustomMagnifier from '../../components/CustomMagnifier'
// import CustomMagnifierMobile from '../../components/CustomMagnifierMobile'
import useIsMobile from '../../hooks/useIsMobile'

function ProductCarousel({ images }) {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const isMobile = useIsMobile()

	const dialogRef = useRef(null);
	const openDialog = () => dialogRef.current?.showModal();
	const closeDialog = () => dialogRef.current?.close();

	return (
		<>
			<section>
				<Swiper modules={[Thumbs]} thumbs={{ swiper: thumbsSwiper }} className="!overflow-visible mb-5" onClick={openDialog}>
					{images.map((slide, index) => (
						<SwiperSlide key={index} className="!flex justify-center">
							{isMobile ? (
								<img src={slide.image} alt="" />
								// <CustomMagnifierMobile src={slide.image} zoom={5} />
							) : (
								<CustomMagnifier src={slide.image} zoom={5} />
							)}
						</SwiperSlide>
					))}
				</Swiper>
				<Swiper
					modules={[Pagination]}
					slidesPerView={3}
					spaceBetween={20}
					pagination={{ clickable: true }}
					watchSlidesProgress={true}
					onSwiper={setThumbsSwiper}
					className="!pb-10 thumbsGallery"
				>
					{images.map((slide, index) => (
						<SwiperSlide key={index}>
							<img src={slide.image} alt="" />
						</SwiperSlide>
					))}
				</Swiper>
			</section>

			<dialog
				ref={dialogRef}
				className="w-screen h-screen p-0 bg-white backdrop:bg-black/50 open:flex open:flex-col open:justify-between"
			>
				<div className="absolute top-4 left-4 z-10">
					<button
						onClick={closeDialog}
						className="px-4 py-2 border rounded-full bg-white shadow"
					>
						Back
					</button>
				</div>

				{/* Centered Main Swiper */}
				<div className="flex-grow flex items-center justify-center">
					<Swiper
						modules={[Thumbs]}
						thumbs={{ swiper: thumbsSwiper }}
						className="max-w-full"
					>
						{images.map((slide, index) => (
							<SwiperSlide key={index} className="!flex justify-center">
								<CustomMagnifier src={slide.image} zoom={5} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* Bottom Thumbs Swiper */}
				<div className="p-4 border-t">
					<Swiper
						modules={[Pagination]}
						slidesPerView={3}
						spaceBetween={20}
						pagination={{ clickable: true }}
						watchSlidesProgress={true}
						onSwiper={setThumbsSwiper}
						className="thumbsGallery"
					>
						{images.map((slide, index) => (
							<SwiperSlide key={index}>
								<img src={slide.image} alt="" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</dialog>
		</>
	)
}

ProductCarousel.propTypes = { images: PropTypes.array }

export default ProductCarousel
