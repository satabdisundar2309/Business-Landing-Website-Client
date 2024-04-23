import React from "react";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaRegListAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const AdminsLayout = () => {
  const {user, adminLoading} = useAuth()

  if(!adminLoading){
    if(!user.isAdmin){
      return <Navigate to="/" /> //not writing return will show error here
    }
  }
  
  return (
    <>
      <section className="admin-section">
        <header>
          <div className="container">
            <nav>
              <ul className="admin-layout-ul">
                <li>
                  <NavLink to="/admin/users"><FaUser/> Users</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/contacts"><FaMessage/> Messages</NavLink>
                </li>
                <li>
                  <NavLink to="/"><FaHome/> Home</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </section>
      <Outlet />
    </>
  );
};

export default AdminsLayout;
