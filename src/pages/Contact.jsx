import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Contact = () => {

  const navigate = useNavigate()
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData, setUserData] = useState(true);
  const { user } = useAuth();
  if (user && userData) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(contact);

    try {
      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/contact", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success(data.message)
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Contact Us</h1>
        </div>

        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/contact.png" alt="contact" />
          </div>

          <section className="section-form">
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={contact.username}
                  onChange={changeHandler}
                  id="username"
                  autoComplete="off"
                  placeholder="enter username"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contact.email}
                  onChange={changeHandler}
                  id="email"
                  autoComplete="off"
                  placeholder="enter email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  value={contact.message}
                  onChange={changeHandler}
                  id="message"
                  cols="30"
                  rows="10"
                  placeholder="add message"
                ></textarea>
              </div>
              <div>
                <button type="submit">Send</button>
              </div>
            </form>
          </section>
        </div>

        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7485.330393307075!2d85.79799463844374!3d20.2727154890438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a7839d99be19%3A0x355b4ea94429d65f!2sSatabdi%20Nagar%2C%20Baramunda%2C%20Bhubaneswar%2C%20Odisha%20751003!5e0!3m2!1sen!2sin!4v1713351536457!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact;
