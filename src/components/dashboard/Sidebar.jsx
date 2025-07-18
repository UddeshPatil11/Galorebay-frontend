import { Link } from 'react-router-dom'

function Sidebar() {
	return (
		<>
			<aside>
				<nav className="text-white bg-secondary rounded-3xl flex flex-col gap-5 p-5">
					<Link to="/dashboard">Dashboard</Link>
					<Link to="/dashboard/users">Users</Link>
					<Link to="/dashboard/contacts">Contacts</Link>
					<Link to="/dashboard/posts">Posts</Link>
					<Link to="/dashboard/pages">Pages</Link>
					<Link to="/dashboard/pages/home">Home</Link>
					<Link to="/dashboard/brands">Brands</Link>
					<Link to="/dashboard/products">Products</Link>
					<Link to="/dashboard/attributes">Attributes</Link>
					<Link to="/dashboard/orders">Orders</Link>
					<Link to="/signout">Sign out</Link>
				</nav>
			</aside>
		</>
	)
}

export default Sidebar
