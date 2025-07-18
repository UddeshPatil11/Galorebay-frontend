import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { FaEye } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

function DashboardOrders({ orders, getOrders }) {
	const updateOrderStatus = async (id, newStatus) => {
		// Ask for confirmation
		const confirmUpdate = window.confirm(`Are you sure you want to mark this order as "${newStatus}"?`)
		if (!confirmUpdate) return

		// Show loading toast
		const loadingToastId = toast.loading('Please wait... Updating status')

		try {
			const docRef = doc(db, 'orders', id)
			await updateDoc(docRef, { status: newStatus })
			await getOrders()
			toast.update(loadingToastId, {
				render: 'Status updated!',
				type: 'success',
				isLoading: false,
				autoClose: 3000,
			})
		} catch {
			toast.update(loadingToastId, {
				render: 'Failed to update status',
				type: 'error',
				isLoading: false,
				autoClose: 3000,
			})
		}
	}

	const deleteOrder = async id => {
		try {
			const docRef = doc(db, 'orders', id)
			await deleteDoc(docRef)
			await getOrders()
			toast.success('Deleted!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!orders) return <>Loading...</>

	return (
		<>
			<main>
				<section>
					<div className="text-white bg-secondary font-medium flex flex-col lg:flex-row">
						<div className="lg:w-2/12 p-2 border">Order Id</div>
						<div className="lg:w-3/12 p-2 border">Client Details</div>
						<div className="lg:w-3/12 p-2 border">Product Details</div>
						<div className="lg:w-2/12 p-2 border">User</div>
						<div className="lg:w-1/12 p-2 border">Status</div>
						<div className="lg:w-1/12 p-2 border">Actions</div>
					</div>
					{orders.map((order, index) => (
						<div key={index} className="flex flex-col lg:flex-row">
							<div className="lg:w-2/12 p-2 border flex items-center break-all">{order.id}</div>
							<div className="lg:w-3/12 p-2 border flex flex-col justify-center">
								{order.firstName} {order.lastName} <br />
								{order.company} <br />
								{order.email} <br />
								{order.phone} <br />
								{order.gst} <br />
								{order.address}
							</div>
							<div className="lg:w-3/12 p-2 border flex flex-col justify-center">
								{order.carts.map((cart, index) => (
									<div key={index}>
										{cart.brand} {cart.model} {cart.modelNo} <br /> ₹{cart.price}
									</div>
								))}
							</div>
							<div className="lg:w-2/12 p-2 border flex items-center capitalize">{order.userFirstName} {order.userLastName} ({order.role})</div>

							<div className="lg:w-1/12 p-2 border flex items-center">
								<select
									className={`font-semibold text-xs w-full px-0.5 py-1 rounded-full shadow-sm outline-none
										${order.status === 'pending' ? 'text-amber-700 bg-amber-100' : ''}
										${order.status === 'completed' ? 'text-green-700 bg-green-100' : ''}
										${order.status === 'rejected' ? 'text-red-700 bg-red-100' : ''}`}
									value={order.status}
									onChange={e => updateOrderStatus(order.id, e.target.value)}
								>
									<option value="pending">Pending</option>
									<option value="completed">Completed</option>
									<option value="rejected">Rejected</option>
								</select>
							</div>

							<div className="lg:w-1/12 p-2 border flex items-center justify-between">
								<Link
									to={`${order.id}`}
									className="text-white bg-blue-600 aspect-square px-1 py-1 rounded-full flex items-center justify-center"
								>
									<FaEye />
								</Link>
								<button
									className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
									onClick={() => deleteOrder(order.id)}
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

DashboardOrders.propTypes = { orders: PropTypes.array, getOrders: PropTypes.func }

export default DashboardOrders
