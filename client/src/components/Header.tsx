import { Link, NavLink } from "react-router-dom"

const Header = () => {

    return <header className="header">
        <Link to='/'>Title</Link>
        <NavLink to='/login'>Login</NavLink>
        </header>

}

export default Header