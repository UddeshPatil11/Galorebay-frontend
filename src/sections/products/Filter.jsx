import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

function Filter({
	products,
	types,
	shapes,
	colors,
	brands,
	sizes,
	genders,
	materials,
	setFilteredProducts,
	onClose,
	showApply = false
}) {
	const [filter, setFilter] = useState({
		types: [],
		shapes: [],
		colors: [],
		brands: [],
		models: [],
		sizes: [],
		genders: [],
		materials: []
	})

	useEffect(() => {
		const filtered = products.filter(product => {
			const matchesType =
				filter.types.length === 0 ||
				filter.types.includes(product.type?.toLowerCase())

			const matchesShape =
				filter.shapes.length === 0 ||
				filter.shapes.includes(product.shape?.toLowerCase())

			const matchesColor =
				filter.colors.length === 0 ||
				product.colors?.some(color => filter.colors.includes(color.name?.toLowerCase()))

			const matchesBrand =
				filter.brands.length === 0 ||
				filter.brands.includes(product.brand?.toLowerCase())

			const matchesModel =
				filter.models.length === 0 ||
				filter.models.includes(product.category?.toLowerCase())

			const matchesSize =
				filter.sizes.length === 0 ||
				product.sizes?.some(size => filter.sizes.includes(size.size?.toLowerCase()))

			const matchesGender =
				filter.genders.length === 0 ||
				filter.genders.includes(product.gender?.toLowerCase())

			const matchesMaterial =
				filter.materials.length === 0 ||
				filter.materials.includes(product.material?.toLowerCase())

			return (
				matchesType &&
				matchesShape &&
				matchesColor &&
				matchesBrand &&
				matchesModel &&
				matchesSize &&
				matchesGender &&
				matchesMaterial
			)
		})

		setFilteredProducts(filtered)
	}, [products, filter, setFilteredProducts])

	const handleCheckboxChange = (e, filterKey) => {
		const value = e.target.value.toLowerCase()
		setFilter(state => ({
			...state,
			[filterKey]: state[filterKey].includes(value)
				? state[filterKey].filter(item => item !== value)
				: [...state[filterKey], value]
		}))
	}

	const handleApply = () => {
		onClose?.()
	}

	return (
		<section className="relative">
			<form className="text-xs pb-20">
				<details open>
					<summary className="font-medium uppercase">Frame Type</summary>
					<div className="grid grid-cols-3 gap-2 mt-2">
						{types.map((type, index) => (
							<label key={index} className="p-1 border flex flex-col items-center justify-center">
								<input
									type="checkbox"
									name="type"
									value={type.name}
									onChange={e => handleCheckboxChange(e, 'types')}
								/>
								<img src={type.image} alt={type.name} />
								{type.name}
							</label>
						))}
					</div>
				</details>
				<hr className="my-5" />

				<details open>
					<summary className="font-medium uppercase">Frame Shape</summary>
					<div className="grid grid-cols-3 gap-2 mt-2">
						{shapes.map((shape, index) => (
							<label key={index} className="p-1 border flex flex-col items-center justify-center">
								<input
									type="checkbox"
									name="shape"
									value={shape.name}
									onChange={e => handleCheckboxChange(e, 'shapes')}
								/>
								<img src={shape.image} alt={shape.name} />
								{shape.name}
							</label>
						))}
					</div>
				</details>
				<hr className="my-5" />

				<details open>
					<summary className="font-medium uppercase">Frame Color</summary>
					<div className="grid gap-2 mt-2 max-h-40 overflow-y-auto scrollbar-thin">
						{colors.map((color, index) => (
							<label key={index} className="flex gap-1">
								<input
									type="checkbox"
									name="color"
									value={color.name}
									onChange={e => handleCheckboxChange(e, 'colors')}
								/>
								{color.name}
							</label>
						))}
					</div>
				</details>
				<hr className="my-5" />

				<details>
					<summary className="font-medium uppercase">Brand</summary>
					<div className="grid gap-2 mt-2 max-h-40 overflow-y-auto scrollbar-thin">
						{brands.map((brand, index) => (
							<div key={index}>
								<label className="flex gap-1">
									<input
										type="checkbox"
										name="brand"
										value={brand.name}
										onChange={e => handleCheckboxChange(e, 'brands')}
									/>
									{brand.name}
								</label>
								<div className="ml-5">
									{brand.models.map((model, idx) => (
										<label key={idx} className="flex gap-1">
											<input
												type="checkbox"
												name="model"
												value={model.name}
												onChange={e => handleCheckboxChange(e, 'models')}
											/>
											{model.name}
										</label>
									))}
								</div>
							</div>
						))}
					</div>
				</details>
				<hr className="my-5" />

				<details>
					<summary className="font-medium uppercase">Size</summary>
					<div className="grid gap-2 mt-2 max-h-40 overflow-y-auto scrollbar-thin">
						{sizes.map((size, index) => (
							<label key={index} className="flex gap-1">
								<input
									type="checkbox"
									name="size"
									value={size.name}
									onChange={e => handleCheckboxChange(e, 'sizes')}
								/>
								{size.name}
							</label>
						))}
					</div>
				</details>
				<hr className="my-5" />

				<details>
					<summary className="font-medium uppercase">Gender</summary>
					<div className="grid gap-2 mt-2 max-h-40 overflow-y-auto scrollbar-thin">
						{genders.map((gender, index) => (
							<label key={index} className="flex gap-1">
								<input
									type="checkbox"
									name="gender"
									value={gender.name}
									onChange={e => handleCheckboxChange(e, 'genders')}
								/>
								{gender.name}
							</label>
						))}
					</div>
				</details>
				<hr className="my-5" />

				<details>
					<summary className="font-medium uppercase">Material</summary>
					<div className="grid gap-2 mt-2 max-h-40 overflow-y-auto scrollbar-thin">
						{materials.map((material, index) => (
							<label key={index} className="flex gap-1">
								<input
									type="checkbox"
									name="material"
									value={material.name}
									onChange={e => handleCheckboxChange(e, 'materials')}
								/>
								{material.name}
							</label>
						))}
					</div>
				</details>
			</form>

			{showApply && (
				<div className="fixed bottom-4 left-0 w-full px-4 z-50">
					<button
						onClick={handleApply}
						className="w-full bg-black text-white py-2 rounded shadow-md"
					>
						Apply Filters
					</button>
				</div>
			)}
		</section>
	)
}

Filter.propTypes = {
	products: PropTypes.array,
	types: PropTypes.array,
	shapes: PropTypes.array,
	colors: PropTypes.array,
	brands: PropTypes.array,
	sizes: PropTypes.array,
	genders: PropTypes.array,
	materials: PropTypes.array,
	setFilteredProducts: PropTypes.func,
	onClose: PropTypes.func,
	showApply: PropTypes.bool
}

export default Filter
