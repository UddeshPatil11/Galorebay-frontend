import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function DashboardPages({ pages, getPages }) {
	const deletePage = async id => {
		try {
			const docRef = doc(db, 'pages', id)
			await deleteDoc(docRef)
			await getPages()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!pages) return <>Loading...</>

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
					{pages.map((page, index) => (
						<div key={index} className="flex flex-col lg:flex-row">
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={page.heroImage} alt="" />
							</div>
							<div className="lg:w-11/12 p-2 border flex items-center">
								<p>{page.title}</p>
							</div>
							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${page.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								{/* <button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deletePage(page.id)}
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

DashboardPages.propTypes = { pages: PropTypes.array, getPages: PropTypes.func }

export default DashboardPages
