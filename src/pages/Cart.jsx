import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { db } from '../utils/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { MdClose } from 'react-icons/md'
import HeroSection from '../sections/HeroSection'

function Cart({ user, carts, getCarts }) {
	const navigate = useNavigate()

	useEffect(() => {
		if (!user) navigate('/signin')
	}, [user, navigate])

	const deleteCart = async id => {
		try {
			const docRef = doc(db, 'users', user.id, 'carts', id)
			await deleteDoc(docRef)
			await getCarts()
			toast.success('Success!')
		} catch {
			toast.error('Error!')
		}
	}

	if (!carts) return <>Loading...</>

	return (
		<>
			<Helmet>
				<title>Cart</title>
			</Helmet>

			<main>
				<HeroSection />

				<section className="w-[85%] mx-auto py-16">
					<h1 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">Cart</h1>

					<div className="mb-5">
						<div className="text-white bg-secondary font-medium flex flex-col lg:flex-row">
							<div className="lg:w-1/12 p-2 border">Image</div>
							<div className="lg:w-5/12 p-2 border">Product</div>
							<div className="lg:w-5/12 p-2 border">Color w/ Quantity</div>
							<div className="lg:w-1/12 p-2 border">Actions</div>
						</div>
						{carts.map((cart, index) => (
							<div key={index} className="flex flex-col lg:flex-row">
								<div className="lg:w-1/12 p-2 border flex items-center">
									<img src={cart.image} alt="" />
								</div>
								<div className="lg:w-5/12 p-2 border flex items-center">
									{cart.brand} {cart.model} {cart.modelNo} <br /> ₹{cart.price}
								</div>
								<div className="lg:w-5/12 p-2 border">
									{Object.entries(cart.colors).map(([key, value], index) => (
										<div key={index} className="flex">
											<div className="basis-2/3 p-1 border">{key}</div>
											<div className="basis-1/3 p-1 border">{value}</div>
										</div>
									))}
								</div>
								<div className="lg:w-1/12 p-2 border flex items-center justify-center">
									<button
										className="text-white bg-red-600 px-1 py-1 rounded-full flex items-center justify-center"
										onClick={() => deleteCart(cart.id)}
									>
										<MdClose />
									</button>
								</div>
							</div>
						))}
					</div>

					<Link
						to="/checkout"
						className="text-white bg-secondary font-medium uppercase text-center inline-block px-7 py-3 rounded-full"
					>
						Proceed To Checkout
					</Link>
				</section>
			</main>
		</>
	)
}

Cart.propTypes = { user: PropTypes.object, carts: PropTypes.array, getCarts: PropTypes.func }

export default Cart
