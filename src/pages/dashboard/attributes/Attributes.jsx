import { Link } from 'react-router-dom'

function DashboardAttributes() {
	return (
		<>
			<main>
				<section className="flex flex-wrap gap-2">
					<Link
						to="types"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Types
					</Link>

					<Link
						to="shapes"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Shapes
					</Link>

					<Link
						to="colors"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Colors
					</Link>

					<Link
						to="sizes"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Sizes
					</Link>

					<Link
						to="genders"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Genders
					</Link>

					<Link
						to="materials"
						className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full"
					>
						Materials
					</Link>
				</section>
			</main>
		</>
	)
}

export default DashboardAttributes
