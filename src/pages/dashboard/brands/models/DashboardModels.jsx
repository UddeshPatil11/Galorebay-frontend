import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, query, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function DashboardModels() {
	const [models, setModels] = useState([])
	const { id } = useParams()

	const getModels = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'brands', id, 'models')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setModels(data)
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getModels()
	}, [getModels])

	const deleteModel = async modelId => {
		try {
			const docRef = doc(db, 'brands', id, 'models', modelId)
			await deleteDoc(docRef)
			await getModels()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

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
					{models.map((model, index) => (
						<div key={index} className="flex">
							<div className="w-11/12 p-2 border flex items-center">{model.name}</div>
							<div className="w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${model.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteModel(model.id)}
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

export default DashboardModels
