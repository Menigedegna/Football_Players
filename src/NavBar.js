import { Link } from "react-router-dom";

const NavBar = () => {

    return(
        <nav className="nav_bar">
            <Link className="nav_link" to="/">Players</Link>
            <Link className="nav_link" to="/Countries">Countries</Link>
            <Link className="nav_link" to="/Clubs">Clubs</Link>
        </nav>
    );
}

export default NavBar;