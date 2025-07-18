import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Header({ carts }) {
	return (
		<>
			<header className="w-full fixed z-20 top-8">
				<div className="w-[85%] mx-auto">
					<div className="bg-[#ECECEC] bg-opacity-50 backdrop-blur rounded-full px-6 py-2 flex items-center justify-between gap-5 shadow-[0_0_12px_-5px_#00000040]">
						<div className="w-1/2 lg:w-1/5">
							<Link to="/">
								<img src="/images/1735878600.png" alt="" className="max-w-32" />
							</Link>
						</div>
						<div className="w-1/2 lg:w-3/5">
							<nav className="text-[#4A4A4A] font-medium hidden items-center justify-between gap-5 lg:flex">
								<Link to="/">Home</Link>
								<Link to="/about">About Us</Link>
								<Link to="/products">Products</Link>
								<div className="relative group">
									<Link to="/brands" className="flex items-center gap-1">
										Brands <img src="/images/1739291935.svg" alt="" className="max-w-3" />
									</Link>
									<nav className="bg-white w-40 p-3 hidden flex-col gap-3 absolute top-full z-50 group-hover:flex">
										<Link to="/brands/gJGJC8HhGM3qs4oNBcU6">Feather</Link>
										<Link to="/brands/t4za1jq2CAcApBo8A5Ma">Galorebay</Link>
										<Link to="/brands/6AIaM7zQkhzRHOi6bFrQ">John Karter</Link>
										<Link to="/brands/5jxUhiQo8vX1plXwwIke">Kidstar</Link>
										<Link to="/brands/gEkUjWa3LaEqbpfPKoRR">Caron</Link>
										<Link to="/brands/TM1h7whl3XDdpy35fJgL">Red Grapes</Link>
										<Link to="/brands/UWSwW3FxGnzavZ6eyRGi">Cashier</Link>
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
										<Link to="/brands/feather">Feather</Link>
										<Link to="/brands/galorebay">Galorebay</Link>
										<Link to="/brands/john-karter">John Karter</Link>
										<Link to="/brands/kidstar">Kidstar</Link>
										<Link to="/brands/caron">Caron</Link>
										<Link to="/brands/red-grapes">Red Grapes</Link>
										<Link to="/brands/cashier">Cashier</Link>
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
				</div>
			</header>
		</>
	)
}

Header.propTypes = { carts: PropTypes.array }

export default Header
