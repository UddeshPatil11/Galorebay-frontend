import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header({ carts }) {
	return (
		<>
			<header className="w-[85%] mx-auto">
				<p className="text-primary font-medium text-xs text-center py-3">Important Offer Upade</p>
				<div className="bg-[#ECECEC] rounded-full px-6 py-2 flex items-center justify-between gap-5 shadow-[0_0_12px_-5px_#00000040]">
					<div className="w-1/2 lg:w-1/5">
						<Link to="/">
							<img src="/images/1735878600.png" alt="" className="max-w-32" />
						</Link>
					</div>
					<div className="w-1/2 lg:w-3/5">
						<nav className="text-secondary font-medium hidden items-center justify-between gap-5 lg:flex">
							<Link to="/">Home</Link>
							<Link to="/about">About Us</Link>
							<Link to="/products">Products</Link>
							<div className="relative group">
								<Link to="/brands" className="flex items-center gap-1">
									Brands <img src="/images/1735878601.svg" alt="" className="max-w-3" />
								</Link>
								<nav className="bg-white w-40 p-3 hidden flex-col gap-3 absolute top-full z-50 group-hover:flex">
									<Link to="/brands/e6d885dXErBX0IegIQ30">Feather</Link>
									<Link to="/brands/pDOc4lQaIMxXSIcAleqo">Galorebay</Link>
									<Link to="/brands/w107tLSrxDktbKfSuZic">John Karter</Link>
									<Link to="/brands/2vAIzn0YOXU6nVH86XSN">Kidstar</Link>
									<Link to="/brands/DXJIG6PmtneiRTnATaHW">Caron</Link>
									<Link to="/brands/2ZKY0e4KPW237clCyJg5">Red Grapes</Link>
									<Link to="/brands/dprM0PvZ7vx7xJjuRfml">Cashier</Link>
								</nav>
							</div>
							<Link to="/blog">Blogs</Link>
							<Link to="/contact">Contact Us</Link>
						</nav>

						<div className="relative group lg:hidden">
							<Link to="#">
								<img src="/images/1735878605.png" alt="" className="w-8 ml-auto" />
							</Link>
							<nav className="text-secondary bg-white font-medium w-40 p-3 hidden flex-col gap-3 absolute top-full right-0 z-50 group-hover:flex">
								<Link to="/">Home</Link>
								<Link to="/about">About Us</Link>
								<Link to="/products">Products</Link>
								<Link to="/brands" className="flex items-center gap-1">
									Brands <img src="/images/1736078401.svg" alt="" className="max-w-3" />
								</Link>
								<nav className="flex flex-col gap-3 pl-3">
									<Link to="/brands/e6d885dXErBX0IegIQ30">Feather</Link>
									<Link to="/brands/pDOc4lQaIMxXSIcAleqo">Galorebay</Link>
									<Link to="/brands/w107tLSrxDktbKfSuZic">John Karter</Link>
									<Link to="/brands/2vAIzn0YOXU6nVH86XSN">Kidstar</Link>
									<Link to="/brands/DXJIG6PmtneiRTnATaHW">Caron</Link>
									<Link to="/brands/2ZKY0e4KPW237clCyJg5">Red Grapes</Link>
									<Link to="/brands/dprM0PvZ7vx7xJjuRfml">Cashier</Link>
								</nav>
								<Link to="/blog">Blogs</Link>
								<Link to="/contact">Contact Us</Link>
								<Link to="/signin">Sign in</Link>
								<Link to="/cart">
									Cart <sup>{carts?.length}</sup>
								</Link>
							</nav>
						</div>
					</div>
					<div className="hidden lg:block lg:w-1/5">
						<nav className="flex items-center justify-end gap-8">
							<Link to="#">
								<img src="/images/1735878602.svg" alt="" className="max-h-4" />
							</Link>
							<Link to="/signin">
								<img src="/images/1735878603.svg" alt="" className="max-h-4" />
							</Link>
							<Link to="/cart" className="flex">
								<img src="/images/1735878604.svg" alt="" className="max-h-4" />
								<sup>{carts?.length}</sup>
							</Link>
						</nav>
					</div>
				</div>
			</header>
		</>
	)
}

Header.propTypes = { carts: PropTypes.array }

export default Header
