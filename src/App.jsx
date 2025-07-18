import { useState, useEffect, useCallback } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth, db } from './utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import ScrollToTop from './components/ScrollToTop'
import Header from './components/HeaderTwo'
import Footer from './components/Footer'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
// import About from './pages/About';
import AboutTwo from './pages/AboutTwo'
import Contact from './pages/Contact'
import Posts from './pages/Posts'
import Post from './pages/Post'
import Brands from './pages/Brands'
import Brand from './pages/Brand'
// import Model from './pages/Model'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Signup from './pages/SignupOtp'
import SignupOtp from './pages/SignupOtp'
import SendOtp from './components/SendOtp'
import Signin from './pages/Signin'
import Signout from './pages/Signout'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/dashboard/Dashboard'
import Whatsapp from './sections/home/Whatsapp'

function App() {
	const [user, setUser] = useState(null)
	const [carts, setCarts] = useState(null)
	const [pages, setPages] = useState([])
	const [trendiestSunglasses, setTrendiestSunglasses] = useState([])
	const [users, setUsers] = useState([])
	const [posts, setPosts] = useState([])
	const [brands, setBrands] = useState([])
	const [products, setProducts] = useState([])
	const [types, setTypes] = useState([])
	const [shapes, setShapes] = useState([])
	const [colors, setColors] = useState([])
	const [sizes, setSizes] = useState([])
	const [genders, setGenders] = useState([])
	const [materials, setMaterials] = useState([])

	const getUser = async id => {
		try {
			const docRef = doc(db, 'users', id)
			const snapshot = await getDoc(docRef)
			setUser({ id: snapshot.id, ...snapshot.data() })
		} catch {
			toast.error('Error!')
		}
	}

	useEffect(() => {
		onAuthStateChanged(auth, user => user && getUser(user.uid))
	}, [])

	const getPages = async () => {
		try {
			const collectionRef = collection(db, 'pages')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setPages(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getTrendiestSunglasses = async () => {
		try {
			const collectionRef = collection(db, 'pages', 'jXjwMzYMrDhttM1DnXqt', 'trendiest_sunglasses')
			const queryRef = query(collectionRef, orderBy('created', 'asc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setTrendiestSunglasses(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getUsers = async () => {
		try {
			const collectionRef = collection(db, 'users')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setUsers(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getPosts = async () => {
		try {
			const collectionRef = collection(db, 'posts')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setPosts(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getBrands = async () => {
		try {
			const collectionRef = collection(db, 'brands')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)

			const data = await Promise.all(
				snapshot.docs.map(async doc => {
					const modelsRef = collection(doc.ref, 'models')
					const modelsSnapshot = await getDocs(modelsRef)
					const models = modelsSnapshot.docs.map(modelDoc => ({
						id: modelDoc.id,
						...modelDoc.data()
					}))

					return { id: doc.id, ...doc.data(), models }
				})
			)

			setBrands(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getProducts = async () => {
		try {
			const collectionRef = collection(db, 'products')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)

			const data = await Promise.all(
				snapshot.docs.map(async doc => {
					// Fetch colors collection
					const colorsRef = collection(doc.ref, 'colors')
					const colorsSnapshot = await getDocs(colorsRef)
					const colors = colorsSnapshot.docs.map(colorDoc => ({
						id: colorDoc.id,
						...colorDoc.data()
					}))

					// Fetch sizes collection
					const sizesRef = collection(doc.ref, 'sizes')
					const sizesSnapshot = await getDocs(sizesRef)
					const sizes = sizesSnapshot.docs.map(sizeDoc => ({
						id: sizeDoc.id,
						...sizeDoc.data()
					}))

					return { id: doc.id, ...doc.data(), colors, sizes }
				})
			)

			setProducts(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getTypes = async () => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'types')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setTypes(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getShapes = async () => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'shapes')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setShapes(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getColors = async () => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'colors')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setColors(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getSizes = async () => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'sizes')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setSizes(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getGenders = async () => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'genders')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setGenders(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getMaterials = async () => {
		try {
			const collectionRef = collection(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'materials')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setMaterials(data)
		} catch {
			toast.error('Error!')
		}
	}

	useEffect(() => {
		getPages()
		getTrendiestSunglasses()
		getUsers()
		getPosts()
		getBrands()
		getProducts()
		getTypes()
		getShapes()
		getColors()
		getSizes()
		getGenders()
		getMaterials()
	}, [])

	const getCarts = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'users', user.id, 'carts')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setCarts(data)
		} catch {
			// toast.error('Error!')
		}
	}, [user])

	useEffect(() => {
		getCarts()
	}, [getCarts])

	return (
		<>
			<HelmetProvider>
				<Router>
					<ScrollToTop />
					<Header user={user} carts={carts} />
					<ToastContainer />
					<Routes>
						<Route path="*" element={<NotFound />} />
						<Route index element={<Home trendiestSunglasses={trendiestSunglasses} brands={brands} />} />
						<Route path="about" element={<AboutTwo />} />
						<Route path="contact" element={<Contact />} />
						<Route path="blog" element={<Posts posts={posts} />} />
						<Route path="blog/:id" element={<Post />} />
						<Route path="brands" element={<Brands brands={brands} />} />
						<Route
							path="brands/:id"
							element={
								<Brand
									products={products}
									types={types}
									shapes={shapes}
									colors={colors}
									brands={brands}
									sizes={sizes}
									genders={genders}
									materials={materials}
								/>
							}
						/>
						{/* <Route
							path="brands/:id/:modelId"
							element={
								<Model
									products={products}
									types={types}
									shapes={shapes}
									colors={colors}
									brands={brands}
									sizes={sizes}
									genders={genders}
									materials={materials}
								/>
							}
						/> */}
						<Route
							path="products"
							element={
								<Products
									products={products}
									types={types}
									shapes={shapes}
									colors={colors}
									brands={brands}
									sizes={sizes}
									genders={genders}
									materials={materials}
								/>
							}
						/>
						<Route
							path="products/:id"
							element={<Product user={user} getCarts={getCarts} products={products} />}
						/>
						<Route path="cart" element={<Cart user={user} carts={carts} getCarts={getCarts} />} />
						<Route path="checkout" element={<Checkout user={user} carts={carts} getCarts={getCarts} />} />
						<Route path="signup" element={<Signup user={user} />} />
						<Route path="signup-otp" element={<SignupOtp user={user} />} />
						<Route path="send-otp" element={<SendOtp />} />
						<Route path="signin" element={<Signin user={user} />} />
						<Route path="signout" element={<Signout setUser={setUser} />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
						<Route
							path="/dashboard/*"
							element={
								<Dashboard
									user={user}
									pages={pages}
									getPages={getPages}
									trendiestSunglasses={trendiestSunglasses}
									getTrendiestSunglasses={getTrendiestSunglasses}
									users={users}
									getUsers={getUsers}
									posts={posts}
									getPosts={getPosts}
									brands={brands}
									getBrands={getBrands}
									products={products}
									getProducts={getProducts}
									types={types}
									getTypes={getTypes}
									shapes={shapes}
									getShapes={getShapes}
									colors={colors}
									getColors={getColors}
									sizes={sizes}
									getSizes={getSizes}
									genders={genders}
									getGenders={getGenders}
									materials={materials}
									getMaterials={getMaterials}
								/>
							}
						/>
					</Routes>
					<Whatsapp />
					<Footer />
				</Router>
			</HelmetProvider>
		</>
	)
}

export default App
