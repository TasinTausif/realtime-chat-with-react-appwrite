import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"

export default function LoginPage() {
	const { user, handleUserLogin } = useAuth()
	const navigate = useNavigate()

	const [credentials, setCredentials] = useState({
		email: "",
		password: ""
	})

	useEffect(() => {
		if (user) {
			navigate('/')
		}
	}, [])

	const handleInputChange = (e) => {
		let name = e.target.name
		let value = e.target.value

		setCredentials({ ...credentials, [name]: value })//Here name will act as a variable for both the input fields
	}

	return (
		<div className="auth--container">
			<div className="form--wrapper">
				<form onSubmit={(e) => handleUserLogin(e, credentials)}>
					<div className="field-wrapper">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							required
							placeholder="Please Enter your email here..."
							name="email"
							id="email"
							value={credentials.email}
							onChange={handleInputChange}
						/>
					</div>
					<div className="field-wrapper">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							required
							placeholder="Please Enter password here..."
							name="password"
							id="password"
							value={credentials.password}
							onChange={handleInputChange}
						/>
					</div>
					<div className="field--wrapper">
						<input
							type="submit"
							className="btn btn--lg btn--main"
							value="Login"
						/>
					</div>
				</form>
				<p>Don't have an account? Register <Link to="/register">here</Link></p>
			</div>
		</div>
	)
}
