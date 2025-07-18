import PropTypes from 'prop-types'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../utils/firebase'
import { collection, query, where, limit, getDocs } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import Product from '../../components/Product'

function BrandProducts({ id, brand, image }) {
	const swiperRef = useRef(null)
	const [products, setProducts] = useState([])

	const getProducts = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'products')
			const queryRef = query(collectionRef, where('brand', '==', brand), limit(6))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setProducts(data)
		} catch (error) {
			console.log(error)
			toast.error('Error!')
		}
	}, [brand])

	useEffect(() => {
		getProducts()
	}, [getProducts])

	return (
		<>
			<div className="relative">
				<img src={image} alt="" className="block m-auto mb-16" />

				<Swiper
					modules={[Navigation]}
					onSwiper={swiper => (swiperRef.current = swiper)}
					slidesPerView={1}
					spaceBetween={30}
					grabCursor={true}
					breakpoints={{
						1024: { slidesPerView: 4 }
					}}
					className="!overflow-visible mb-16"
				>
					{products.map((product, index) => (
						<SwiperSlide key={index} className="!h-auto">
							<Product product={product} />
						</SwiperSlide>
					))}
				</Swiper>

				<img
					src="/images/1739360637-prev.svg"
					alt=""
					onClick={() => swiperRef.current?.slidePrev()}
					className="cursor-pointer w-12 absolute right-16 bottom-0"
				/>
				<img
					src="/images/1739360637-next.svg"
					alt=""
					onClick={() => swiperRef.current?.slideNext()}
					className="cursor-pointer w-12 absolute right-0 bottom-0"
				/>

				<Link
					to={`/brands/${id}`}
					className="text-white bg-secondary font-medium block w-fit md:m-auto px-7 py-3 rounded-full"
				>
					View Full Range
				</Link>
			</div>
		</>
	)
}

BrandProducts.propTypes = { id: PropTypes.string, brand: PropTypes.string, image: PropTypes.string }

export default BrandProducts
