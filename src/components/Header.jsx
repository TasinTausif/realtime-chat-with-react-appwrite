import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import broadCasterIcon from '../assets/broadCasterIcon.png'

const Header = () => {
    const { user, handleUseLogout } = useAuth()
    return (
        <div id="header--wrapper">
            <div className="header--icon">
                <img 
                src={broadCasterIcon} 
                alt="BroadCasterLogo"
            />
            </div>

            {user ? (
                <>
                    Welcome, {user.name}
                    <LogOut className="header--link" onClick={handleUseLogout} />
                </>
            ) : (
                <>
                    <Link to="/">
                        <LogIn className="header--link" />
                    </Link>
                </>
            )}
        </div>
    )
}

export default Header
