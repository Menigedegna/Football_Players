import { Link } from "react-router-dom";

const NavBar = () => {

    return(
        <nav className="nav_bar">
            <Link className="nav_link" to="/">Players</Link>
            <Link className="nav_link" to="/Countries&Clubs">{'Countries \n& Clubs'}</Link>
            <Link className="nav_link" to="/Positions">{'Field \nPositions'}</Link>
        </nav>
    );
}

export default NavBar;