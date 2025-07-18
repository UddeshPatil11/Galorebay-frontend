import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SearchPopup from './SearchPopup'

function Header({ user, carts }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const location = useLocation()

	// Close menu when location changes
	useEffect(() => {
		setMenuOpen(false)
	}, [location])

	return (
		<header className="bg-white">
			<div className="border-b flex">
				<div className="px-6 py-2 border-r hidden md:block">
					Contact Us:{' '}
					<a href="tel:+916363406363" className="text-secondary">
						+91 6363 40 6363
					</a>
				</div>
				<div className="px-6 py-2 border-r mr-auto hidden md:block">
					Email:{' '}
					<a href="mailto:info@galorebayoptix.com" className="text-secondary">
						info@galorebayoptix.com
					</a>
				</div>
				<div className="px-6 py-2 border-l mr-auto md:mr-0">
					Opticians{' '}
					{user ? (
						<>
							<Link to="/dashboard" className="font-medium">
								Dashboard
							</Link>{' '}
							or{' '}
							<Link to="/signout" className="font-medium">
								Signout
							</Link>
						</>
					) : (
						<>
							<Link to="/signin" className="font-medium">
								Login
							</Link>{' '}
							or{' '}
							<Link to="/signup" className="font-medium">
								Register
							</Link>
						</>
					)}
				</div>
				<div className="px-6 py-2 border-l">
					Your bag{' '}
					<Link to="/cart" className="inline-flex">
						<img src="/images/1735878604.svg" alt="" className="max-h-3" />
						<sup className="text-white bg-primary w-3 aspect-square rounded-full flex items-center justify-center">
							{carts?.length}
						</sup>
					</Link>
				</div>
			</div>

			<div className="pt-2 pb-4 flex items-center justify-around gap-3 md:flex-col">
				<Link to="/">
					<img src="/images/1735878600.png" alt="" className="max-w-32 md:max-w-52" />
				</Link>

				{/* Desktop Navigation */}
				<nav className="text-secondary font-medium hidden md:flex items-center justify-between gap-10">
					<Link to="/">Home</Link>
					<Link to="/about">About Us</Link>
					<Link to="/products">Products</Link>
					<div className="relative group">
						<Link to="/brands" className="flex items-center gap-1">
							Brands <img src="/images/1735878601.svg" alt="" className="max-w-3" />
						</Link>
						<nav className="bg-white w-40 p-3 hidden flex-col gap-3 absolute top-full z-50 group-hover:flex">
							<Link to="/brands/gJGJC8HhGM3qs4oNBcU6">Feather</Link>
							<Link to="/brands/t4za1jq2CAcApBo8A5Ma">Galorebay</Link>
							<Link to="/brands/6AIaM7zQkhzRHOi6bFrQ">John Karter</Link>
							<Link to="/brands/5jxUhiQo8vX1plXwwIke">Kidstar</Link>
							<Link to="/brands/vtHx7AH5WJyIqI2IoKC8">Caron</Link>
							<Link to="/brands/TM1h7whl3XDdpy35fJgL">Red Grapes</Link>
							<Link to="/brands/UWSwW3FxGnzavZ6eyRGi">Cashier</Link>
						</nav>
					</div>
					<Link to="/blog">Blogs</Link>
					<Link to="/contact">Contact Us</Link>
					{/* <Link to="/products">
						<img src="/images/1735878602.svg" alt="" className="max-h-4" />
					</Link> */}
					<SearchPopup />
				</nav>

				{/* Mobile Navigation */}
				<div className="relative md:hidden">
					<button onClick={() => setMenuOpen(!menuOpen)}>
						<img src="/images/1735878605.png" alt="Menu" className="w-8 ml-auto" />
					</button>
					{menuOpen && (
						<nav className="text-secondary bg-white font-medium w-40 p-3 flex flex-col gap-3 absolute top-full right-0 z-50">
							<Link to="/">Home</Link>
							<Link to="/about">About Us</Link>
							<Link to="/products">Products</Link>
							<Link to="/brands" className="flex items-center gap-1">
								Brands <img src="/images/1736078401.svg" alt="" className="max-w-3" />
							</Link>
							<nav className="flex flex-col gap-3 pl-3">
								<Link to="/brands/gJGJC8HhGM3qs4oNBcU6">Feather</Link>
								<Link to="/brands/t4za1jq2CAcApBo8A5Ma">Galorebay</Link>
								<Link to="/brands/6AIaM7zQkhzRHOi6bFrQ">John Karter</Link>
								<Link to="/brands/5jxUhiQo8vX1plXwwIke">Kidstar</Link>
								<Link to="/brands/vtHx7AH5WJyIqI2IoKC8">Caron</Link>
								<Link to="/brands/TM1h7whl3XDdpy35fJgL">Red Grapes</Link>
								<Link to="/brands/UWSwW3FxGnzavZ6eyRGi">Cashier</Link>
							</nav>
							<Link to="/blog">Blogs</Link>
							<Link to="/contact">Contact Us</Link>
						</nav>
					)}
				</div>
			</div>
		</header>
	)
}

Header.propTypes = { user: PropTypes.object, carts: PropTypes.array }

export default Header
