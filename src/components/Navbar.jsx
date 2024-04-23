import React, {useState} from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/authContext";
import { FaBars} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
const Navbar = () => {
  const { isLoggedin } = useAuth();
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <header className="nav">
        <div className="container">
          <div className="logo-brand">
            <Link to="/">
              <img
                src="https://satabdisundar-portfolio.netlify.app/Images/logoWBorder2.png"
                alt="LOGO"
                width={100}
              />
            </Link>
          </div>
          <div className="menu" onClick={()=>{setShowMenu(!showMenu)}}>
            {showMenu? <FaX className="hide"/>: <FaBars className="show"/> }
          </div>

          <nav className="usernav">
            <ul className={showMenu ? "open" : ""}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Services</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {!!isLoggedin ? (
                <li>
                  <NavLink to="/logout">Logout</NavLink>
                </li>
              ) : (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
