import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { NavLink, Link } from "react-router-dom";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";

const AdminUsers = () => {
  const { AuthorizationToken } = useAuth();
  const [users, setUsers] = useState([]);

  const getAllUsersData = async () => {
    try {
      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/admin/users", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      // console.log(data)
      setUsers(data.users);
      console.log(data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId)=>{
    try {
      const response = await fetch(`https://business-landing-website-server.onrender.com/api/v1/admin/user/delete/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        }
      })
      if(response.ok){
        getAllUsersData();
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <>
      <section className="admin-user-section">
        <section className="admin-users-section">
            <h1>Users Data</h1>
          <div className="container grid grid-four-cols">
              {users.map((user) => {
                return (
                  <div key={user._id} className="card">
                    <p><strong>Name</strong>: {user.username}</p>
                    <p><strong>Email</strong>: {user.email}</p>
                    <p><strong>Phone</strong>: {user.phone}</p>
                    <p>{user.isAdmin ? <strong>Admin ✔</strong> : <strong>Admin ❌</strong>}</p>
                    <div className="grid grid-two-cols">
                    <NavLink to={`/admin/users/${user._id}/edit`}>Edit <FaPenToSquare/></NavLink>
                    <button
                      className="btn"
                      onClick={()=>{deleteUser(user._id)}}
                    >
                      Delete <FaTrash/>
                    </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </section>
    </>
  );
};

export default AdminUsers;
