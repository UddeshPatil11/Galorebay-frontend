import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'

function Signout({ setUser }) {
	const navigate = useNavigate()

	const handleSignOut = useCallback(async () => {
		try {
			await signOut(auth)
			setUser(null)
			toast.success('Success!')
			navigate('/signin')
		} catch {
			toast.error('Error!')
		}
	}, [setUser, navigate])

	useEffect(() => {
		handleSignOut()
	}, [handleSignOut])

	return (
		<>
			<Helmet>
				<title>Sign out</title>
			</Helmet>

			<main></main>
		</>
	)
}

Signout.propTypes = { setUser: PropTypes.func }

export default Signout
