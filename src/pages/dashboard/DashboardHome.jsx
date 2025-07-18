import PropTypes from "prop-types";
import { Helmet } from 'react-helmet-async'
import { FaUserTie } from 'react-icons/fa'
import { FaBuildingUser } from 'react-icons/fa6'

function DashboardHome({ users }) {
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>

			<main>
				<section>
					<h1 className="text-primary font-medium text-3xl text-center mb-16 lg:text-5xl">
						Welcome, Superuser!
					</h1>
				</section>

				<section className="text-white flex flex-col gap-5 lg:flex-row">
					<div className="lg:w-1/2">
						<div className="bg-gradient-to-l from-secondary via-primary p-12 rounded-full flex flex-col items-center">
							<FaUserTie className="text-5xl mb-5" />
							<p className="text-4xl">{users.filter(user => user.role === 'Salesperson').length}</p>
							<p className="text-2xl italic">Salesperson</p>
						</div>
					</div>
					<div className="lg:w-1/2">
						<div className="bg-gradient-to-l from-secondary via-primary p-12 rounded-full flex flex-col items-center">
							<FaBuildingUser className="text-5xl mb-5" />
							<p className="text-4xl">{users.filter(user => user.role === 'Business Entity').length}</p>
							<p className="text-2xl italic">Business Entity</p>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

DashboardHome.propTypes = {
	users: PropTypes.array,
};

export default DashboardHome
