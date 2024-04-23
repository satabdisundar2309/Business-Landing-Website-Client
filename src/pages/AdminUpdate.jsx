import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/authContext";
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AdminUpdate = () => {
    const navigate = useNavigate()
    const { AuthorizationToken } = useAuth();
    const [userdata, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
        isAdmin: false
      });
    const {id} = useParams();

    const getSingleUserData = async ()=>{
        try {
            const response = await fetch(`https://business-landing-website-server.onrender.com/api/v1/admin/user/${id}`, {
                method: "GET",
                headers: {
                    Authorization: AuthorizationToken,
                }
            })
            if(response.ok){
                const data = await response.json();
                console.log(data.user)
                setUserData(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const changeHandler = (e)=>{
        const {name, value, type, checked} = e.target;
        setUserData((prev)=>{
            return {
                ...prev, [name] : type === "checkbox" ? checked : value
            }
        })
    }

    const submitHandler = async (e)=>{
        e.preventDefault();
        console.log(userdata)
        try {
            const response = await fetch(`https://business-landing-website-server.onrender.com/api/v1/admin/user/edit/${id}`, {
                method: "PUT",
                body: JSON.stringify(userdata), 
                headers: {
                    Authorization : AuthorizationToken,
                    "Content-Type": "application/json"
                }
            })
            if(response.ok){
                const data = await response.json();
                toast.success("user updated")
                navigate("/admin/users")
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getSingleUserData();
    }, [])


  return (
    <section className='admin-update'>
         <section className="section-contact section-contact2">
      <div className="contact-content container">
        <h1 className="main-heading">Update User</h1>
      </div>
      <div className="container grid grid-two-cols">
        <section className="section-form">
          <form onSubmit={submitHandler} className='updateForm'>
            <div>
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={userdata.username}
                onChange={changeHandler}
                required
              />
            </div>

            <div>
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={userdata.email}
                onChange={changeHandler}
                required
              />
            </div>

            <div>
              <label htmlFor="phone">Mobile</label>
              <input
                type="phone"
                name="phone"
                id="phone"
                autoComplete="off"
                value={userdata.phone}
                onChange={changeHandler}
                required
              />
            </div>

            <div className='checkboxField'>
              <p>Admin</p>
              <input
                type='checkbox'
                name="isAdmin"
                id="admin"
                value={userdata.isAdmin}
                checked = {userdata.isAdmin && "checked"}
                onChange={changeHandler}
              />
            </div>

            <div>
              <button type="submit">Update</button>
            </div>
          </form>
        </section>
      </div>
    </section>
    </section>
  )
}

export default AdminUpdate