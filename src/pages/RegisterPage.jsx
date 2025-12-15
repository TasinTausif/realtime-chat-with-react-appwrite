import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../utils/AuthContext"

export default function RegisterPage() {
    const { handleUserRegistration } = useAuth()

    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({ ...credentials, [name]: value })
    }

    return (
        <div className="auth--container">
            <div className="form--wrapper">
                <form onSubmit={(e) => handleUserRegistration(e, credentials)}>
                    <div className="field-wrapper">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            required
                            placeholder="Please Enter your fullname here..."
                            name="name"
                            id="name"
                            value={credentials.name}
                            onChange={handleInputChange}
                        />
                    </div>
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
                    <div className="field-wrapper">
                        <label htmlFor="confirmPassword">Password:</label>
                        <input
                            type="password"
                            required
                            placeholder="Retype your password here..."
                            name="confirmPassword"
                            id="confirmPassword"
                            value={credentials.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field--wrapper">
                        <input
                            type="submit"
                            className="btn btn--lg btn--main"
                            value="Register"
                        />
                    </div>
                </form>
                <p>Already have an account? Login <Link to="/login">here</Link></p>
            </div>
        </div>
    )
}
