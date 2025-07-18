import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../../../../utils/firebase'
import { collection, query, orderBy, getDocs, doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function DashboardSizes() {
	const [sizes, setSizes] = useState([])
	const { id } = useParams()

	const getSizes = useCallback(async () => {
		try {
			const collectionRef = collection(db, 'products', id, 'sizes')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const snapshot = await getDocs(queryRef)
			const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			setSizes(data)
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getSizes()
	}, [getSizes])

	const deleteSize = async sizeId => {
		try {
			const docRef = doc(db, 'products', id, 'sizes', sizeId)
			await deleteDoc(docRef)
			await getSizes()
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
						<div className="w-11/12 p-2 border">Size</div>
						<div className="w-1/12 p-2 border">Actions</div>
					</div>
					{sizes.map((size, index) => (
						<div key={index} className="flex">
							<div className="w-11/12 p-2 border flex items-center">{size.size}</div>
							<div className="w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${size.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteSize(size.id)}
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

export default DashboardSizes
