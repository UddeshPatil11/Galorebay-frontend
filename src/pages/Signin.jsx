import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth, db } from '../utils/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection'

function Signin({ user, setUser }) {
	const [formData, setFormData] = useState({ email: '', password: '' })
	const navigate = useNavigate()

	useEffect(() => {
		if (user) {
			if (user.role === 'superuser') navigate('/dashboard')
			else if (user.status === 'approved') navigate('/products')
		}
	}, [user, navigate])

	const handleChange = e => {
		setFormData(state => ({ ...state, [e.target.name]: e.target.value }))
	}

	const signIn = async (email, password) => await signInWithEmailAndPassword(auth, email, password)

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const { email, password } = formData
			const userCredential = await signIn(email, password)
			const fbUser = userCredential.user

			const userDocRef = doc(db, 'users', fbUser.uid)
			const userSnapshot = await getDoc(userDocRef)

			if (!userSnapshot.exists()) {
				toast.error("No user profile found.")
				await auth.signOut()
				return
			}

			const profileData = userSnapshot.data()

			// 🔐 Approval check
			if (profileData.status !== 'approved') {
				toast.error("Your account is pending admin approval.")
				await auth.signOut()
				return
			}

			const combinedUser = {
				uid: fbUser.uid,
				email: fbUser.email,
				...profileData
			}

			if (setUser) setUser(combinedUser)

			toast.success('Success!')

			if (combinedUser.role === 'superuser') navigate('/dashboard')
			else navigate('/products')

			setFormData({ email: '', password: '' })

		} catch (err) {
			console.error(err)
			toast.error('Invalid credentials or network issue.')
		}
	}

	return (
		<>
			<Helmet>
				<title>Sign in</title>
			</Helmet>

			<main>
				<HeroSection />

				<section>
					<div className="w-[80%] mx-auto py-12 relative overflow-hidden z-10">
						<div className="bg-[#F9F9FF] w-full aspect-square rounded-full absolute top-12 left-1/2 -translate-x-1/2 -z-10"></div>
						<h1 className="text-primary font-medium text-3xl text-center mb-3 lg:text-7xl">Sign in</h1>

						<form method="post" className="max-w-96 mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
							<div>
								<label>Email</label>
								<input
									type="email"
									name="email"
									value={formData.email}
									placeholder="Email"
									className="bg-white w-full rounded border py-2 px-3 outline-none focus:border-secondary"
									onChange={handleChange}
									required
								/>
							</div>

							<div>
								<label>Password</label>
								<input
									type="password"
									name="password"
									value={formData.password}
									placeholder="Password"
									className="bg-white w-full rounded border py-2 px-3 outline-none focus:border-secondary"
									onChange={handleChange}
									required
								/>
							</div>

							<button className="text-white bg-secondary font-medium inline-block px-7 py-3 rounded-full">
								Sign in
							</button>

							<div className="flex justify-between px-2 mt-4">
								<Link to="/forgot-password" className="text-sm text-gray-600 hover:text-secondary">
									Forgot Password
								</Link>
								<Link to="/signup" className="text-sm text-gray-600 hover:text-secondary">
									Sign up
								</Link>
							</div>
						</form>
					</div>
				</section>
			</main>
		</>
	)
}

Signin.propTypes = {
	user: PropTypes.object,
	setUser: PropTypes.func
}

export default Signin
