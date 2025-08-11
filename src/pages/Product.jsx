import PropTypes from 'prop-types'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { db } from '../utils/firebase'
import {
	collection,
	query,
	orderBy,
	getDocs,
	doc,
	getDoc,
	addDoc,
	serverTimestamp,
	where,
	limit
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import HeroSection from '../sections/HeroSection'
import ProductCarousel from '../sections/product/ProductCarousel'
import Description from '../sections/product/Description'
import RelatedProducts from '../sections/product/RelatedProducts'

function Product({ user, getCarts }) {
	const [page, setPage] = useState({})
	const { id } = useParams()
	const navigate = useNavigate()
	const [product, setProduct] = useState({})
	const [colors, setColors] = useState([])
	const [sizes, setSizes] = useState([])
	const [images, setImages] = useState([])
	const [formData, setFormData] = useState({})
	const [relatedProducts, setRelatedProducts] = useState([])
	const [brandId, setBrandId] = useState(null)

	// --- Fetch Page Data ---
	const getPage = useCallback(async () => {
		try {
			const docRef = doc(db, 'pages', 'GLUmSaJl79QHhQd16wQ1')
			const snapshot = await getDoc(docRef)
			setPage(snapshot.data())
		} catch {
			toast.error('Error loading page!')
		}
	}, [])

	// --- Fetch Product ---
	const getProduct = useCallback(async () => {
		try {
			const docRef = doc(db, 'products', id)
			const snapshot = await getDoc(docRef)
			setProduct({ id: snapshot.id, ...snapshot.data() })
		} catch {
			toast.error('Error loading product!')
		}
	}, [id])

	// --- Fetch Colors ---
	const getColors = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'products', id, 'colors')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setColors(data)
			setFormData(data.reduce((acc, color) => {
				acc[color.name] = 0
				return acc
			}, {}))
		} catch {
			toast.error('Error loading colors!')
		}
	}, [id])

	// --- Fetch Sizes ---
	const getSizes = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'products', id, 'sizes')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			setSizes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
		} catch {
			toast.error('Error loading sizes!')
		}
	}, [id])

	// --- Fetch Images ---
	const getImages = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'products', id, 'images')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			setImages([{ image: product.image }, ...snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))])
		} catch {
			toast.error('Error loading images!')
		}
	}, [id, product])

	// --- Fetch Related Products ---
	const getRelatedProducts = useCallback(async () => {
		if (!product.brand) return
		try {
			const brandSnapshot = await getDocs(
				query(collection(db, 'brands'), where('name', '==', product.brand))
			)

			if (!brandSnapshot.empty) {
				const brandDoc = brandSnapshot.docs[0]
				setBrandId(brandDoc.id)

				const productsSnapshot = await getDocs(
					query(
						collection(db, 'products'),
						where('brand', '==', product.brand),
						limit(6)
					)
				)

				setRelatedProducts(
					productsSnapshot.docs
						.map(doc => ({ id: doc.id, ...doc.data() }))
						.filter(item => item.id !== product.id)
				)
			}
		} catch (error) {
			console.error('Error fetching related products:', error)
		}
	}, [product])

	// --- Hooks ---
	useEffect(() => { getPage() }, [getPage])
	useEffect(() => { getProduct() }, [getProduct])
	useEffect(() => { getColors() }, [getColors])
	useEffect(() => { getSizes() }, [getSizes])
	useEffect(() => { getImages() }, [getImages])
	useEffect(() => { getRelatedProducts() }, [getRelatedProducts])

	// --- Quantity Calculation ---
	const calculateTotalQuantity = () =>
		Object.values(formData).reduce((sum, quantity) => sum + Number(quantity), 0)

	const handleChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.value }))
	}

	// --- Add to Cart ---
	const handleSubmit = async e => {
		e.preventDefault()
		if (!user) {
			toast.error('Please sign in to add products to your cart.')
			return navigate('/signin')
		}
		if (user.role !== 'admin' && user.status !== 'approved') {
			toast.error('Your account is pending approval.')
			return
		}

		const { brand, model, modelNo, price, type, shape, size, gender, material, image } = product
		const data = {
			brand, model, modelNo, price, type, shape, size, gender, material, image,
			colors: formData
		}

		try {
			const collectionRef = collection(db, 'users', user.id, 'carts')
			await addDoc(collectionRef, {
				...data,
				created: serverTimestamp(),
				updated: serverTimestamp()
			})
			await getCarts()
			toast.success('Added to cart successfully!')
			navigate('/cart')
		} catch (error) {
			toast.error('Failed to add to cart')
			console.error('Add cart error:', error)
		}
	}

	// --- Determine if user can view price ---
	const canViewPrice = user && (user.role === 'admin' || user.status === 'approved')

	return (
		<>
			<Helmet>
				<title>{product.metaTitle}</title>
				<meta name="description" content={product.metaDescription} />
			</Helmet>

			<HeroSection heroImage={page.heroImage} />

			<main className="my-16">
				<section className="w-[85%] mx-auto flex flex-col justify-around gap-16 lg:flex-row lg:items-center">
					<div className="lg:w-2/5">
						<ProductCarousel images={images} />
					</div>

					<div className="lg:w-2/5">
						<h3 className="text-primary font-medium text-xs uppercase mb-1">{product.brand}</h3>
						<h1 className="font-medium text-xl mb-5">
							{product.model} <br /> {product.modelNo}
						</h1>

						{/* Show purchase section only if admin or approved */}
						{canViewPrice ? (
							<>
								<p className="font-medium text-lg mb-5">₹ {product.price}</p>
								<form method="post" onSubmit={handleSubmit} className="mb-3">
									<div className="mb-3">
										<div className="text-white bg-secondary font-medium flex">
											<div className="w-1/2 p-2 border">Color</div>
											<div className="w-1/2 p-2 border">Quantity</div>
										</div>

										{Object.entries(formData).map(([key, value], index) => (
											<div key={index} className="flex">
												<div className="w-1/2 p-2 border flex items-center">
													{colors[index]?.name}
													<span
														title={`${colors[index]?.quantity > 0 ? 'In Stock' : 'Out of Stock'}`}
														className={`ml-1 w-2 h-2 rounded-full ${colors[index]?.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}
													></span>
												</div>
												<div className="w-1/2 p-2 border flex items-center">
													<button
														type="button"
														className="text-white bg-green-600 text-xs aspect-square rounded-full"
														onClick={() => {
															if (value < colors[index]?.quantity) {
																setFormData(state => ({ ...state, [key]: value + 1 }))
															}
														}}
													>
														<FaPlus />
													</button>
													<input
														name={key}
														value={value}
														min={0}
														placeholder="Qty"
														className="bg-white w-full rounded border py-1 px-3 outline-none mx-1 focus:border-secondary"
														onChange={handleChange}
														required
													/>
													<button
														type="button"
														className="text-white bg-red-600 text-xs aspect-square rounded-full"
														onClick={() => {
															if (value > 0) {
																setFormData(state => ({ ...state, [key]: value - 1 }))
															}
														}}
													>
														<FaMinus />
													</button>
												</div>
											</div>
										))}

										<div className="flex">
											<div className="w-1/2 p-2"></div>
											<div className="w-1/2 p-2 flex">
												<div className="w-1/2 p-2 border">{calculateTotalQuantity()}</div>
												<div className="w-1/2 p-2 border">₹{calculateTotalQuantity() * product.price}</div>
											</div>
										</div>
									</div>

									<button className="text-white bg-secondary font-medium uppercase w-full px-7 py-3 rounded-full mb-3">
										Add To Cart
									</button>

									<button className="text-white bg-primary font-medium uppercase w-full px-7 py-3 rounded-full">
										Buy It Now
									</button>
								</form>
							</>
						) : user && user.status === 'pending' ? (
							<p className="text-red-500 mt-5 font-semibold">
								Your account is pending admin approval. Price and purchase options will be available once approved.
							</p>
						) : (
							<div className="my-8 text-center">
								<p className="text-lg font-semibold text-gray-600 mb-3">
									Please sign in to view price and purchase options.
								</p>
								<button
									className="bg-primary text-white px-6 py-2 rounded-full font-medium"
									onClick={() => navigate('/signin')}
									type="button"
								>
									Sign In
								</button>
							</div>
						)}
					</div>
				</section>

				<Description product={product} sizes={sizes} />
				<RelatedProducts products={relatedProducts} brandId={brandId} />
			</main>
		</>
	)
}

Product.propTypes = {
	user: PropTypes.object,
	getCarts: PropTypes.func
}

export default Product
