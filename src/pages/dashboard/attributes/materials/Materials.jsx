import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function Materials({ materials, getMaterials }) {
	const deleteMaterial = async id => {
		try {
			const docRef = doc(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'materials', id)
			await deleteDoc(docRef)
			await getMaterials()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!materials) return <>Loading...</>

	return (
		<>
			<main>
				<section>
					<div className="flex justify-end mb-2">
						<Link to="add" className="text-white bg-green-600 aspect-square p-1 rounded-full">
							<FaPlus />
						</Link>
					</div>

					<div className="text-white bg-secondary font-medium flex">
						<div className="w-11/12 p-2 border">Name</div>
						<div className="w-1/12 p-2 border">Actions</div>
					</div>
					{materials.map((material, index) => (
						<div key={index} className="flex">
							<div className="w-11/12 p-2 border flex items-center">
								<p className="line-clamp-1">{material.name}</p>
							</div>
							<div className="w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${material.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteMaterial(material.id)}
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

Materials.propTypes = { materials: PropTypes.array, getMaterials: PropTypes.func }

export default Materials
