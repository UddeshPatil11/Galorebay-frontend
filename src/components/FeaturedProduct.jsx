import PropTypes from 'prop-types'

function FeaturedProduct({ product }) {
	return (
		<>
			<div className="bg-[#ffffffc2] aspect-square shadow-[0_0_12px_-5px_#00000040] p-10 rounded-2xl flex items-center justify-center">
				<img src={product.image} alt="" />
			</div>
			<div className="pt-6 flex">
				<div className="w-1/2">
					<h3 className="text-primary font-medium text-xs uppercase mb-1">{product.brand}</h3>
					<h4 className="font-medium">
						{product.model} No. {product.modelNo}
					</h4>
					<p className="font-light">More Info, like nick name etc.</p>
				</div>
				<div className="w-1/2 flex items-center justify-center gap-3">
					<a
						href="/products/7t7MVUtYJ7sLC4eTq4iJ"
						className="text-xs border border-black px-3 py-2 rounded-full flex items-center gap-3 group transition-all duration-300 hover:text-white hover:bg-secondary hover:border-secondary"
					>
						View More
						<img src="/images/1735878900.svg" alt="" className="max-w-2 group-hover:invert" />
					</a>
					<a
						href="/products/7t7MVUtYJ7sLC4eTq4iJ"
						className="p-2 border border-black rounded-full group transition-all duration-300 hover:bg-secondary hover:border-secondary"
					>
						<img src="/images/1735878901.svg" alt="" className="max-w-4 group-hover:!invert" />
					</a>
				</div>
			</div>
		</>
	)
}

FeaturedProduct.propTypes = { product: PropTypes.object }

export default FeaturedProduct
