import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

function Filter({ products, setFilteredProducts }) {
	const [filter, setFilter] = useState({ brand: '', model: '', modelNo: '' })

	const handleChange = e => {
		const { name, value } = e.target
		const updatedFilter = { ...filter, [name]: value }

		setFilter(updatedFilter)

		const filtered = products.filter(
			product =>
				(updatedFilter.brand === '' ||
					product.brand.toLowerCase().includes(updatedFilter.brand.toLowerCase())) &&
				(updatedFilter.model === '' ||
					product.model.toLowerCase().includes(updatedFilter.model.toLowerCase())) &&
				(updatedFilter.modelNo === '' ||
					product.modelNo.toLowerCase().includes(updatedFilter.modelNo.toLowerCase()))
		)

		if (!updatedFilter.brand && !updatedFilter.model && !updatedFilter.modelNo) {
			setFilteredProducts(products)
		} else {
			setFilteredProducts(filtered)
		}
	}

	useEffect(() => {
		setFilteredProducts(products)
	}, [products, setFilteredProducts])

	return (
		<section>
			<form className="text-xs flex flex-col lg:flex-row gap-2">
				<input
					type="search"
					name="brand"
					value={filter.brand}
					placeholder="Brand"
					className="bg-white rounded border py-1 px-3 outline-none focus:border-secondary"
					onChange={handleChange}
				/>
				<input
					type="search"
					name="model"
					value={filter.model}
					placeholder="Model"
					className="bg-white rounded border py-1 px-3 outline-none focus:border-secondary"
					onChange={handleChange}
				/>
				<input
					type="search"
					name="modelNo"
					value={filter.modelNo}
					placeholder="Model No"
					className="bg-white rounded border py-1 px-3 outline-none focus:border-secondary"
					onChange={handleChange}
				/>
			</form>
		</section>
	)
}

Filter.propTypes = {
	products: PropTypes.array.isRequired,
	setFilteredProducts: PropTypes.func.isRequired
}

export default Filter
