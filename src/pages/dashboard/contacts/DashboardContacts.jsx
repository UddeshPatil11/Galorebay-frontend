import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaPlus } from 'react-icons/fa6'
import { MdOutlineModeEditOutline, MdClose } from 'react-icons/md'

function DashboardContacts({ contacts, getContacts }) {
	const deleteContact = async id => {
		try {
			const docRef = doc(db, 'contacts', id)
			await deleteDoc(docRef)
			await getContacts()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!contacts) return <>Loading...</>

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
						<div className="lg:w-2/12 p-2 border">Name</div>
						<div className="lg:w-2/12 p-2 border">Phone</div>
						<div className="lg:w-2/12 p-2 border">Email</div>
						<div className="lg:w-5/12 p-2 border">Message</div>
						<div className="lg:w-1/12 p-2 border">Actions</div>
					</div>
					{contacts.map((contact, index) => (
						<div key={index} className="flex flex-col lg:flex-row">
							<div className="lg:w-2/12 p-2 border flex items-center">{contact.name}</div>
							<div className="lg:w-2/12 p-2 border flex items-center">{contact.phone}</div>
							<div className="lg:w-2/12 p-2 border flex items-center">{contact.email}</div>
							<div className="lg:w-5/12 p-2 border flex items-center">{contact.message}</div>
							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${contact.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<MdOutlineModeEditOutline />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteContact(contact.id)}
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

DashboardContacts.propTypes = { contacts: PropTypes.array, getContacts: PropTypes.func }

export default DashboardContacts
