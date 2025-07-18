import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function TrendiestSunglasses({ trendiestSunglasses, getTrendiestSunglasses }) {
	const deleteTrendiestSunglass = async id => {
		try {
			const docRef = doc(db, 'pages', 'jXjwMzYMrDhttM1DnXqt', 'trendiest_sunglasses', id)
			await deleteDoc(docRef)
			await getTrendiestSunglasses()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!trendiestSunglasses) return <>Loading...</>

	return (
		<>
			<main>
				<section>
					<div className="flex justify-end mb-2">
						<Link to="add" className="text-white bg-green-600 aspect-square p-1 rounded-full">
							<FaPlus />
						</Link>
					</div>

					<div className="text-white bg-secondary font-medium flex flex-col lg:flex-row">
						<div className="lg:w-1/12 p-2 border">Image</div>
						<div className="lg:w-10/12 p-2 border">Title</div>
						<div className="lg:w-1/12 p-2 border">Actions</div>
					</div>
					{trendiestSunglasses.map((sunglass, index) => (
						<div key={index} className="flex flex-col lg:flex-row">
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={sunglass.image} alt="" />
							</div>
							<div className="lg:w-10/12 p-2 border flex items-center">
								<p className="line-clamp-1">{sunglass.title}</p>
							</div>
							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${sunglass.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteTrendiestSunglass(sunglass.id)}
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

TrendiestSunglasses.propTypes = {
	trendiestSunglasses: PropTypes.array,
	getTrendiestSunglasses: PropTypes.func
}

export default TrendiestSunglasses
