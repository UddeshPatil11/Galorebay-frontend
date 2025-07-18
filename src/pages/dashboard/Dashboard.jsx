import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { db } from '../../utils/firebase'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { toast } from 'react-toastify'
import HeroSection from '../../sections/HeroSection'
import Sidebar from '../../components/dashboard/Sidebar'
import DashboardHome from './DashboardHome'
import DashboardPages from './pages/DashboardPages'
import DashboardPage from './pages/DashboardPage'
import Home from './pages/home/Home'
import TrendiestSunglasses from './trendiest-sunglasses/TrendiestSunglasses'
import TrendiestSunglass from './trendiest-sunglasses/TrendiestSunglass'
import AddTrendiestSunglass from './trendiest-sunglasses/AddTrendiestSunglass'
import DashboardAddPage from './pages/DashboardAddPage'
import DashboardUsers from './users/DashboardUsers'
import DashboardUser from './users/DashboardUser'
import DashboardAddUser from './users/DashboardAddUser'
import DashboardPosts from './posts/DashboardPosts'
import DashboardPost from './posts/DashboardPost'
import DashboardAddPost from './posts/DashboardAddPost'
import DashboardContacts from './contacts/DashboardContacts'
import DashboardContact from './contacts/DashboardContact'
import DashboardAddContact from './contacts/DashboardAddContact'
import DashboardBrands from './brands/DashboardBrands'
import DashboardBrand from './brands/DashboardBrand'
import DashboardAddBrand from './brands/DashboardAddBrand'
import DashboardModels from './brands/models/DashboardModels'
import DashboardModel from './brands/models/DashboardModel'
import DashboardAddModel from './brands/models/DashboardAddModel'
import DashboardProducts from './products/DashboardProducts'
import DashboardProduct from './products/DashboardProduct'
import DashboardAddProduct from './products/DashboardAddProduct'
import DashboardColors from './products/colors/DashboardColors'
import DashboardColor from './products/colors/DashboardColor'
import DashboardAddColor from './products/colors/DashboardAddColor'
import DashboardImages from './products/images/DashboardImages'
import DashboardImage from './products/images/DashboardImage'
import DashboardAddImage from './products/images/DashboardAddImage'
import DashboardOrders from './orders/DashboardOrders'
import DashboardOrder from './orders/DashboardOrder'
import DashboardAddOrder from './orders/DashboardAddOrder'
import Attributes from './attributes/Attributes'
import Types from './attributes/types/Types'
import Type from './attributes/types/Type'
import AddType from './attributes/types/AddType'
import Shapes from './attributes/shapes/Shapes'
import Shape from './attributes/shapes/Shape'
import AddShape from './attributes/shapes/AddShape'
import Colors from './attributes/colors/Colors'
import Color from './attributes/colors/Color'
import AddColor from './attributes/colors/AddColor'
import Sizes from './attributes/sizes/Sizes'
import Size from './attributes/sizes/Size'
import AddSize from './attributes/sizes/AddSize'
import Genders from './attributes/genders/Genders'
import Gender from './attributes/genders/Gender'
import AddGender from './attributes/genders/AddGender'
import Materials from './attributes/materials/Materials'
import Material from './attributes/materials/Material'
import AddMaterial from './attributes/materials/AddMaterial'
import { RiArrowGoBackFill } from 'react-icons/ri'
import DashboardSizes from './products/sizes/DashboardSizes'
import DashboardSize from './products/sizes/DashboardSize'
import DashboardAddSize from './products/sizes/DashboardAddSize'

function Dashboard({
	user,
	pages,
	getPages,
	trendiestSunglasses,
	getTrendiestSunglasses,
	users,
	getUsers,
	posts,
	getPosts,
	brands,
	getBrands,
	products,
	getProducts,
	types,
	getTypes,
	shapes,
	getShapes,
	colors,
	getColors,
	sizes,
	getSizes,
	genders,
	getGenders,
	materials,
	getMaterials
}) {
	const [contacts, setContacts] = useState([])
	const [orders, setOrders] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		if (!user || user.role !== 'superuser') navigate('/signin')
	}, [user, navigate])

	const getContacts = async () => {
		try {
			const collectionRef = collection(db, 'contacts')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setContacts(data)
		} catch {
			toast.error('Error!')
		}
	}

	const getOrders = async () => {
		try {
			const collectionRef = collection(db, 'orders')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = []

			for (const orderDoc of snapshot.docs) {
				const collectionRef = collection(db, 'orders', orderDoc.id, 'carts')
				const queryRef = query(collectionRef, orderBy('created', 'desc'))
				const snapshot = await getDocs(queryRef)
				const carts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

				data.push({ id: orderDoc.id, ...orderDoc.data(), carts })
			}

			setOrders(data)
		} catch {
			toast.error('Error!')
		}
	}

	useEffect(() => {
		getContacts()
		getOrders()
	}, [])

	return (
		<>
			<HeroSection />

			<section>
				<div className="w-[95%] mx-auto py-16">
					<div className="flex flex-col gap-5 lg:flex-row">
						<div className="lg:w-1/6">
							<Sidebar />
						</div>
						<div className="lg:w-5/6">
							<RiArrowGoBackFill className="cursor-pointer mb-5" onClick={() => navigate(-1)} />

							<Routes>
								<Route index element={<DashboardHome users={users} />} />
								<Route path="pages" element={<DashboardPages pages={pages} getPages={getPages} />} />
								<Route path="pages/:id" element={<DashboardPage getPages={getPages} />} />
								<Route path="pages/add" element={<DashboardAddPage getPages={getPages} />} />
								<Route path="pages/home" element={<Home />} />
								<Route
									path="trendiest-sunglasses"
									element={
										<TrendiestSunglasses
											trendiestSunglasses={trendiestSunglasses}
											getTrendiestSunglasses={getTrendiestSunglasses}
										/>
									}
								/>
								<Route
									path="trendiest-sunglasses/:id"
									element={<TrendiestSunglass getTrendiestSunglasses={getTrendiestSunglasses} />}
								/>
								<Route
									path="trendiest-sunglasses/add"
									element={<AddTrendiestSunglass getTrendiestSunglasses={getTrendiestSunglasses} />}
								/>
								<Route path="users" element={<DashboardUsers users={users} getUsers={getUsers} />} />
								<Route path="users/:id" element={<DashboardUser getUsers={getUsers} />} />
								<Route path="users/add" element={<DashboardAddUser getUsers={getUsers} />} />
								<Route path="posts" element={<DashboardPosts posts={posts} getPosts={getPosts} />} />
								<Route path="posts/:id" element={<DashboardPost getPosts={getPosts} />} />
								<Route path="posts/add" element={<DashboardAddPost getPosts={getPosts} />} />
								<Route
									path="contacts"
									element={<DashboardContacts contacts={contacts} getContacts={getContacts} />}
								/>
								<Route path="contacts/:id" element={<DashboardContact getContacts={getContacts} />} />
								<Route path="contacts/add" element={<DashboardAddContact getContacts={getContacts} />} />
								<Route
									path="brands"
									element={<DashboardBrands brands={brands} getBrands={getBrands} />}
								/>
								<Route path="brands/:id" element={<DashboardBrand getBrands={getBrands} />} />
								<Route path="brands/add" element={<DashboardAddBrand getBrands={getBrands} />} />
								<Route path="brands/:id/models" element={<DashboardModels />} />
								<Route path="brands/:id/models/:modelId" element={<DashboardModel />} />
								<Route path="brands/:id/models/add" element={<DashboardAddModel />} />
								<Route
									path="products"
									element={<DashboardProducts products={products} getProducts={getProducts} />}
								/>
								<Route
									path="products/:id"
									element={
										<DashboardProduct
											getProducts={getProducts}
											brands={brands}
											types={types}
											shapes={shapes}
											sizes={sizes}
											genders={genders}
											materials={materials}
										/>
									}
								/>
								<Route
									path="products/add"
									element={
										<DashboardAddProduct
											getProducts={getProducts}
											brands={brands}
											types={types}
											shapes={shapes}
											sizes={sizes}
											genders={genders}
											materials={materials}
										/>
									}
								/>
								<Route path="products/:id/sizes" element={<DashboardSizes />} />
								<Route path="products/:id/sizes/:sizeId" element={<DashboardSize sizes={sizes} />} />
								<Route path="products/:id/sizes/add" element={<DashboardAddSize sizes={sizes} />} />
								<Route path="products/:id/colors" element={<DashboardColors />} />
								<Route path="products/:id/colors/:colorId" element={<DashboardColor />} />
								<Route path="products/:id/colors/add" element={<DashboardAddColor />} />
								<Route path="products/:id/images" element={<DashboardImages />} />
								<Route path="products/:id/images/:imageId" element={<DashboardImage />} />
								<Route path="products/:id/images/add" element={<DashboardAddImage />} />
								<Route
									path="orders"
									element={<DashboardOrders orders={orders} getOrders={getOrders} />}
								/>
								<Route path="orders/:id" element={<DashboardOrder getOrders={getOrders} />} />
								<Route path="orders/add" element={<DashboardAddOrder getOrders={getOrders} />} />

								<Route path="attributes" element={<Attributes />} />
								<Route path="attributes/types" element={<Types types={types} getTypes={getTypes} />} />
								<Route path="attributes/types/:id" element={<Type getTypes={getTypes} />} />
								<Route path="attributes/types/add" element={<AddType getTypes={getTypes} />} />
								<Route
									path="attributes/shapes"
									element={<Shapes shapes={shapes} getShapes={getShapes} />}
								/>
								<Route path="attributes/shapes/:id" element={<Shape getShapes={getShapes} />} />
								<Route path="attributes/shapes/add" element={<AddShape getShapes={getShapes} />} />
								<Route
									path="attributes/colors"
									element={<Colors colors={colors} getColors={getColors} />}
								/>
								<Route path="attributes/colors/:id" element={<Color getColors={getColors} />} />
								<Route path="attributes/colors/add" element={<AddColor getColors={getColors} />} />
								<Route path="attributes/sizes" element={<Sizes sizes={sizes} getSizes={getSizes} />} />
								<Route path="attributes/sizes/:id" element={<Size getSizes={getSizes} />} />
								<Route path="attributes/sizes/add" element={<AddSize getSizes={getSizes} />} />
								<Route
									path="attributes/genders"
									element={<Genders genders={genders} getGenders={getGenders} />}
								/>
								<Route path="attributes/genders/:id" element={<Gender getGenders={getGenders} />} />
								<Route path="attributes/genders/add" element={<AddGender getGenders={getGenders} />} />
								<Route
									path="attributes/materials"
									element={<Materials materials={materials} getMaterials={getMaterials} />}
								/>
								<Route
									path="attributes/materials/:id"
									element={<Material getMaterials={getMaterials} />}
								/>
								<Route
									path="attributes/materials/add"
									element={<AddMaterial getMaterials={getMaterials} />}
								/>
							</Routes>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

Dashboard.propTypes = {
	user: PropTypes.object,
	pages: PropTypes.array,
	getPages: PropTypes.func,
	trendiestSunglasses: PropTypes.array,
	getTrendiestSunglasses: PropTypes.func,
	users: PropTypes.array,
	getUsers: PropTypes.func,
	posts: PropTypes.array,
	getPosts: PropTypes.func,
	brands: PropTypes.array,
	getBrands: PropTypes.func,
	products: PropTypes.array,
	getProducts: PropTypes.func,
	orders: PropTypes.array,
	getOrders: PropTypes.func,
	types: PropTypes.array,
	getTypes: PropTypes.func,
	shapes: PropTypes.array,
	getShapes: PropTypes.func,
	colors: PropTypes.array,
	getColors: PropTypes.func,
	sizes: PropTypes.array,
	getSizes: PropTypes.func,
	genders: PropTypes.array,
	getGenders: PropTypes.func,
	materials: PropTypes.array,
	getMaterials: PropTypes.func
}

export default Dashboard
