import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function DashboardBrands({ brands, getBrands }) {
	const deleteBrand = async id => {
		try {
			const collectionRef = collection(db, 'brands', id, 'models')
			const snapshot = await getDocs(collectionRef)

			for (const modelDoc of snapshot.docs) {
				const docRef = doc(db, 'brands', id, 'models', modelDoc.id)
				await deleteDoc(docRef)
			}

			const docRef = doc(db, 'brands', id)
			await deleteDoc(docRef)
			await getBrands()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!brands) return <>Loading...</>

	return (
		<>
			<main>
				<section>
					<div className="flex justify-end mb-2">
						<Link to="add" className="text-white bg-green-600 aspect-square p-1 rounded-full">
							<FaPlus />
						</Link>
					</div>

					<div className="text-white bg-secondary font-medium flex flex-col md:flex-row">
						<div className="lg:w-1/12 p-2 border truncate">Hero Image</div>
						<div className="lg:w-1/12 p-2 border">Image</div>
						<div className="lg:w-8/12 p-2 border">Name</div>
						<div className="lg:w-1/12 p-2 border">Product</div>
						<div className="lg:w-1/12 p-2 border">Actions</div>
					</div>
					{brands.map((brand, index) => (
						<div key={index} className="flex flex-col md:flex-row">
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={brand.heroImage} alt="" />
							</div>
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={brand.image} alt="" />
							</div>
							<div className="lg:w-8/12 p-2 border flex items-center">
								<p className="line-clamp-1">{brand.name}</p>
							</div>
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={brand.productImage} alt="" />
							</div>
							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${brand.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								{/* <button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteBrand(brand.id)}
								>
									<MdClose />
								</button> */}
							</div>
						</div>
					))}
				</section>
			</main>
		</>
	)
}

DashboardBrands.propTypes = { brands: PropTypes.array, getBrands: PropTypes.func }

export default DashboardBrands
