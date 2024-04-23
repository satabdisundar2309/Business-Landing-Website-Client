import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  useEffect(()=>{
    const auth = localStorage.getItem("token")
    if(auth){
    navigate('/')
  }
  }, [])

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const changeHandler = (e) => {
    // let name = e.target.name;
    // let value = e.target.value;
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(user);
      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      console.log(response);

      if (response.ok) {
        storeTokenInLS(data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        toast.success("Registered 💖")
        navigate("/");
      }
      else{
        toast.error(`${data.message? data.message : data.extraDetails} 🤷‍♀️`)
      }

    } catch (error) {
      console.log("Registration", error);
    }
  };

  return (
    <>
      <section className="section-register">
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/registration.png"
                  alt="registration image"
                  width={500}
                  height={500}
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Register here</h1>
                <br />
                <form onSubmit={submitHandler} action="">
                  <div>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="enter username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter email id"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="enter phone number"
                      id="phone"
                      required
                      autoComplete="off"
                      value={user.phone}
                      onChange={changeHandler}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="enter password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={changeHandler}
                    />
                  </div>
                  <br />
                  <button className="btn btn-submit" type="submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
