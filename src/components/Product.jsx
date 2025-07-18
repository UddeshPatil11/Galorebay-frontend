import PropTypes from 'prop-types'
import { useNavigate, Link } from 'react-router-dom'
// import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'

function Product({ product }) {
	const navigate = useNavigate()

	return (
		<>
			<div
				onClick={() => navigate(`/products/${product.id}`)}
				className="cursor-pointer flex flex-col h-full p-6 pt-8 rounded-2xl shadow-[0_0_12px_-5px_#00000040]"
			>
				<img src={product.image} alt="" className="h-24 object-contain mb-8" />
				{/* <InnerImageZoom
					src={product.image}
					zoomSrc={product.image}
					zoomType="hover"
					alt={`${product.brand} ${product.model}`}
					// zoomPreload={true}
					// loading="lazy"
				/> */}

				<h3 className="text-primary font-medium text-xs uppercase mb-1">{product.brand}</h3>
				<h4 className="font-medium">
					{product.model} <br /> {product.modelNo}
				</h4>
				<p className="font-light mb-4">More Info, like nick name etc.</p>
				<div className="flex items-center justify-between mt-auto">
					<Link
						to={`/products/${product.id}`}
						className="text-xs border border-black px-3 py-2 rounded-full flex items-center gap-3 group transition-all duration-300 hover:text-white hover:bg-secondary hover:border-secondary"
					>
						View More
						<img src="/images/1735878900.svg" alt="" className="max-w-2 group-hover:invert" />
					</Link>
					<Link
						to={`/products/${product.id}`}
						className="p-2 border border-black rounded-full group transition-all duration-300 hover:bg-secondary hover:border-secondary"
					>
						<img src="/images/1735878901.svg" alt="" className="max-w-4 group-hover:!invert" />
					</Link>
				</div>
			</div>
		</>
	)
}

Product.propTypes = { product: PropTypes.object }

export default Product
