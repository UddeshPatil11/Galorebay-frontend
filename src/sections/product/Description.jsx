import PropTypes from 'prop-types'
import { useState } from 'react'

function Description({ product, sizes }) {
	const [tab, setTab] = useState(1)

	return (
		<>
			<section className="w-[85%] mx-auto my-16">
				<div className="flex justify-center gap-5 mb-10">
					<button
						className={`text-lg lg:min-w-48 ${tab === 1 && 'font-medium'}`}
						onClick={() => setTab(1)}
					>
						Description
					</button>
					<hr className="h-8 border" />
					<button
						className={`text-lg lg:min-w-48 ${tab === 2 && 'font-medium'}`}
						onClick={() => setTab(2)}
					>
						Terms & Conditions
					</button>
				</div>
				{tab === 1 ? (
					<>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Brand</div>
							<div className="w-1/2 p-2 border">{product.brand}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Series</div>
							<div className="w-1/2 p-2 border">{product.model}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Model No.</div>
							<div className="w-1/2 p-2 border">{product.modelNo}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Type</div>
							<div className="w-1/2 p-2 border">{product.type}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Shape</div>
							<div className="w-1/2 p-2 border">{product.shape}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Sizes</div>
							{/* <div className="w-1/2 p-2 border">{product.size}</div> */}
							<div className="w-1/2 p-2 border">{sizes.map(size => `${size.size}`).join(', ')}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Gender</div>
							<div className="w-1/2 p-2 border">{product.gender}</div>
						</div>
						<div className="flex">
							<div className="w-1/2 font-medium p-2 border">Material</div>
							<div className="w-1/2 p-2 border">{product.material}</div>
						</div>
					</>
				) : (
					<>
						<p>{product.description}</p>
					</>
				)}
			</section>
		</>
	)
}

Description.propTypes = { product: PropTypes.object, sizes: PropTypes.array }

export default Description
