import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../../utils/firebase'
import { collection, query, orderBy, getDocs, doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

function DashboardOrder() {
	const [order, setOrder] = useState({})
	const { id } = useParams()

	const getOrder = useCallback(async () => {
		try {
			const docRef = doc(db, 'orders', id)
			const snapshot = await getDoc(docRef)

			const collectionRef = collection(db, 'orders', id, 'carts')
			const queryRef = query(collectionRef, orderBy('created', 'desc'))
			const cartsSnapshot = await getDocs(queryRef)
			const carts = cartsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

			setOrder({ id: snapshot.id, ...snapshot.data(), carts })
		} catch {
			toast.error('Error!')
		}
	}, [id])

	useEffect(() => {
		getOrder()
	}, [getOrder])

	if (!order.carts) return <>Loading...</>

	return (
		<>
			<main>
				<section className="mb-10">
					<div className="text-white bg-secondary font-medium flex">
						<div className="w-1/2 p-2 border">Order Id</div>
						<div className="w-1/2 p-2 border">Status</div>
					</div>
					<div className="flex">
						<div className="w-1/2 p-2 border flex items-center">{order.id}</div>
						<div className="w-1/2 p-2 border flex items-center">{order.status}</div>
					</div>
				</section>

				<section className="mb-10">
					<div className="text-white bg-secondary font-medium flex">
						<div className="w-1/12 p-2 border">User</div>
						<div className="w-1/12 p-2 border">Client's Name</div>
						<div className="w-2/12 p-2 border">Company</div>
						<div className="w-2/12 p-2 border">Email</div>
						<div className="w-1/12 p-2 border">Phone</div>
						<div className="w-2/12 p-2 border">Message</div>
						<div className="w-1/12 p-2 border">GST</div>
						<div className="w-2/12 p-2 border">Address</div>
					</div>
					<div className="flex">
						<div className="w-1/12 p-2 border flex items-center">
							{order.userFirstName} {order.userLastName} ({order.role})
						</div>
						<div className="w-1/12 p-2 border flex items-center">
							{order.firstName} {order.lastName}
						</div>
						<div className="w-2/12 p-2 border flex items-center">{order.company}</div>
						<div className="w-2/12 p-2 border flex items-center break-all">{order.email}</div>
						<div className="w-1/12 p-2 border flex items-center break-all">{order.phone}</div>
						<div className="w-2/12 p-2 border flex items-center break-all">{order.message}</div>
						<div className="w-1/12 p-2 border flex items-center break-all">{order.gst}</div>
						<div className="w-2/12 p-2 border flex items-center break-all">{order.address}</div>
					</div>
				</section>

				<section>
					<div className="mb-5">
						<div className="text-white bg-secondary font-medium flex">
							<div className="w-1/12 p-2 border">Image</div>
							<div className="w-5/12 p-2 border">Product</div>
							<div className="w-6/12 p-2 border">Color w/ Quantity</div>
						</div>
						{order.carts.map((cart, index) => (
							<div key={index} className="flex">
								<div className="w-1/12 p-2 border flex items-center">
									<img src={cart.image} alt="" />
								</div>
								<div className="w-5/12 p-2 border flex items-center">
									{cart.brand} {cart.model} {cart.modelNo} <br /> ₹{cart.price}
								</div>
								<div className="w-6/12 p-2 border">
									{Object.entries(cart.colors).map(([key, value], index) => (
										<div key={index} className="flex">
											<div className="basis-2/3 p-1 border">{key}</div>
											<div className="basis-1/3 p-1 border">{value}</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
		</>
	)
}

export default DashboardOrder
