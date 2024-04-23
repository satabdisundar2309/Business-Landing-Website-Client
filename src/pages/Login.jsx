import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();

  useEffect(()=>{
    const auth = localStorage.getItem("token")
    if(auth){
    navigate('/')
  }
  }, [])

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
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

      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/login", {
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
          email: "",
          password: "",
        });
        // alert("Congratulations, You are now logged in")
        toast.success("Logged in 💖")
        navigate("/");
      }
      else{
        toast.error(`${data.message} 🤷‍♀️`)
      }
    } catch (error) {
      console.log("Login", error);
    }
  };
  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/Login2.png"
                  alt="registration image"
                  width={500}
                  height={500}
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Login here</h1>
                <br />
                <form onSubmit={submitHandler} action="">
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
                    Login
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

export default Login;
