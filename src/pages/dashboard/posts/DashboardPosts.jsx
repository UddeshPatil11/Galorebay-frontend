import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function DashboardPosts({ posts, getPosts }) {
	const deletePost = async id => {
		try {
			const docRef = doc(db, 'posts', id)
			await deleteDoc(docRef)
			await getPosts()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!posts) return <>Loading...</>

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
					{posts.map((post, index) => (
						<div key={index} className="flex flex-col lg:flex-row">
							<div className="lg:w-1/12 p-2 border flex items-center">
								<img src={post.image} alt="" />
							</div>
							<div className="lg:w-10/12 p-2 border flex items-center">
								<p className="line-clamp-1">{post.title}</p>
							</div>
							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${post.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deletePost(post.id)}
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

DashboardPosts.propTypes = { posts: PropTypes.array, getPosts: PropTypes.func }

export default DashboardPosts
