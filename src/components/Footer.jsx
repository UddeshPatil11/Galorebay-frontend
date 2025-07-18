import { Link } from 'react-router-dom'

function Footer() {
	return (
		<>
			<footer>
				<div className="w-[85%] mx-auto">
					<div className="text-white bg-secondary flex flex-col gap-5 p-5 rounded-[2rem] shadow-[0_0_12px_-5px_#00000040] lg:flex-row lg:gap-10 lg:p-12 lg:rounded-[3rem]">
						<div className="lg:w-1/4">
							<Link to="/" className="font-semibold text-3xl mb-2">
								Galorebay
							</Link>
							<p className="text-xs">
								Offering the best optical frames and sunglasses to our pan India client base with a trust
								on quality.
							</p>
						</div>
						<div className="lg:w-1/5">
							<h4 className="font-semibold text-lg mb-2">Quick Links</h4>
							<nav className="flex flex-col gap-1">
								<Link to="/">Home</Link>
								<Link to="/about">About Us</Link>
								<Link to="/products">Products</Link>
								<Link to="/brands">Brands</Link>
								<Link to="/blog">Blog</Link>
								<Link to="/privacy-policy">Privacy Policy</Link>
								<Link to="/signin">Login</Link>
								<Link to="/contact">Contact</Link>
								<Link to="/careers">Careers</Link>
							</nav>
						</div>
						<div className="lg:w-[30%]">
							<h4 className="font-semibold text-lg mb-2">Brands</h4>
							<nav className="flex gap-5">
								<div className="flex flex-col gap-1">
									<Link to="/brands/gJGJC8HhGM3qs4oNBcU6">Feather</Link>
									<Link to="/brands/t4za1jq2CAcApBo8A5Ma">Galorebay</Link>
									<Link to="/brands/6AIaM7zQkhzRHOi6bFrQ">John Karter</Link>
									<Link to="/brands/5jxUhiQo8vX1plXwwIke">Kidstar</Link>
									<Link to="/brands/gEkUjWa3LaEqbpfPKoRR">Caron</Link>
									<Link to="/brands/TM1h7whl3XDdpy35fJgL">Red Grapes</Link>
									<Link to="/brands/UWSwW3FxGnzavZ6eyRGi">Cashier</Link>
								</div>
							</nav>
						</div>
						<div className="lg:w-1/4">
							<h4 className="font-semibold text-lg mb-2">Contact Us</h4>
							<nav className="flex flex-col gap-3 mb-5">
								<Link to="#" className="flex items-center gap-3">
									<img src="/images/1735878660.svg" alt="" className="max-w-4" />
									1/33, Second Floor, Mall Road, Tilak Nagar, New Delhi - 110018 (INDIA)
								</Link>
								<Link to="mailto:info@galorebayoptix.com" className="flex items-center gap-3">
									<img src="/images/1735878661.svg" alt="" className="max-w-4" />
									info@galorebayoptix.com
								</Link>
								<Link to="tel:+916363406363" className="flex items-center gap-3">
									<img src="/images/1735878662.svg" alt="" className="max-w-4" />
									+91 6363 40 6363
								</Link>
							</nav>
							<h4 className="font-semibold text-lg mb-2">Follow Us</h4>
							<nav className="flex gap-3">
								<Link to="https://x.com/" target="_blank">
									<img src="/images/1735878663.svg" alt="" className="max-w-6" />
								</Link>
								<Link
									to="https://instagram.com/galorebayoptix.official?igshid=5a7u76htiw7y"
									target="_blank"
								>
									<img src="/images/1735878664.svg" alt="" className="max-w-6" />
								</Link>
								<Link to="https://www.facebook.com/" target="_blank">
									<img src="/images/1735878665.svg" alt="" className="max-w-6" />
								</Link>
								<Link to="https://www.linkedin.com/" target="_blank">
									<img src="/images/1735878666.svg" alt="" className="max-w-6" />
								</Link>
								<Link to="https://www.youtube.com/" target="_blank">
									<img src="/images/1735878667.svg" alt="" className="max-w-6" />
								</Link>
							</nav>
						</div>
					</div>
					<p className="text-primary font-medium text-center py-5">
						2025 All rights reserved. Galorebay Optix India
					</p>
				</div>
			</footer>
		</>
	)
}

export default Footer
