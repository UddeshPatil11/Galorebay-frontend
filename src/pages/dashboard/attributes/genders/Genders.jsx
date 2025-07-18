import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function Genders({ genders, getGenders }) {
	const deleteGender = async id => {
		try {
			const docRef = doc(db, 'attributes', 'pJBK4dJDb5UzegM9gXx5', 'genders', id)
			await deleteDoc(docRef)
			await getGenders()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!genders) return <>Loading...</>

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
					{genders.map((gender, index) => (
						<div key={index} className="flex">
							<div className="w-11/12 p-2 border flex items-center">
								<p className="line-clamp-1">{gender.name}</p>
							</div>
							<div className="w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${gender.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteGender(gender.id)}
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

Genders.propTypes = { genders: PropTypes.array, getGenders: PropTypes.func }

export default Genders
