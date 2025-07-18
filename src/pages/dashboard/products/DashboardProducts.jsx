import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'
import Filter from '../../../sections/dashboard/products/Filter'

function DashboardProducts({ products, getProducts }) {
	const [filteredProducts, setFilteredProducts] = useState([])

	useEffect(() => {
		setFilteredProducts(products)
	}, [products])

	const deleteProduct = async id => {
		try {
			const deleteSubcollection = async subcollection => {
				const collectionRef = collection(db, 'products', id, subcollection)
				const snapshot = await getDocs(collectionRef)

				for (const snap of snapshot.docs) {
					const docRef = doc(db, 'products', id, subcollection, snap.id)
					await deleteDoc(docRef)
				}
			}
			deleteSubcollection('colors')
			deleteSubcollection('images')

			const docRef = doc(db, 'products', id)
			await deleteDoc(docRef)
			await getProducts()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!products) return <>Loading...</>

	return (
		<>
			<main>
				<Filter products={products} setFilteredProducts={setFilteredProducts} />

				<section>
					<div className="flex justify-end mb-2">
						<Link to="add" className="text-white bg-green-600 aspect-square p-1 rounded-full">
							<FaPlus />
						</Link>
					</div>

					<div className="text-white bg-secondary font-medium flex flex-col md:flex-row">
						<div className="lg:w-1/12 p-2 border">Image</div>
						<div className="lg:w-2/12 p-2 border">Brand</div>
						<div className="lg:w-4/12 p-2 border">Model</div>
						<div className="lg:w-2/12 p-2 border">Model No</div>
						<div className="lg:w-2/12 p-2 border">Price</div>
						<div className="lg:w-1/12 p-2 border">Actions</div>
					</div>
					{filteredProducts.map((product, index) => (
						<div key={index} className="flex flex-col md:flex-row">
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={product.image} alt="" />
							</div>
							<div className="lg:w-2/12 p-2 border flex items-center">{product.brand}</div>
							<div className="lg:w-4/12 p-2 border flex items-center">{product.model}</div>
							<div className="lg:w-2/12 p-2 border flex items-center">{product.modelNo}</div>
							<div className="lg:w-2/12 p-2 border flex items-center">{product.price}</div>
							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${product.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteProduct(product.id)}
								>
									<MdClose />
								</button>
							</div>
						</div>
					))}
				</section>
			</main>
		</>
	)
}

DashboardProducts.propTypes = { products: PropTypes.array, getProducts: PropTypes.func }

export default DashboardProducts
