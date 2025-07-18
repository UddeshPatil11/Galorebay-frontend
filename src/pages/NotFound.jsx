import { Helmet } from 'react-helmet-async'

function NotFound() {
	return (
		<>
			<Helmet>
				<title>Not Found</title>
			</Helmet>

			<main className="my-16">
				<section className="w-[85%] mx-auto">
					<h1 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">
						Not Found
					</h1>
				</section>
			</main>
		</>
	)
}

export default NotFound
