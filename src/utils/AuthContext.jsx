import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get()
            setUser(accountDetails)
        } catch (error) {
            console.error(error)
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault()

        try {
            await account.createEmailPasswordSession(
                credentials.email, 
                credentials.password
            );
            let accountDetails = await account.get()

            setUser(accountDetails)
            navigate('/')

        } catch (error) {
            console.error(error)
        }
    }

    const handleUseLogout = async () => {
        await account.deleteSession('current');
        setUser(null)
    }

    const handleUserRegistration = async (e, credentials) => {
        e.preventDefault()

        if (credentials.password !== credentials.confirmPassword) {
            alert("Password didnt matched!")
            return
        }

        try {
            await account.create(
                ID.unique(), 
                credentials.email, 
                credentials.password, 
                credentials.name
            );

            await account.createEmailPasswordSession(
                credentials.email, 
                credentials.password
            );
            let accountDetails = await account.get()

            setUser(accountDetails)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUseLogout,
        handleUserRegistration
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export default AuthContext