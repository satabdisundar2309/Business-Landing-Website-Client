import React from 'react'
import Analytics from '../components/Analytics'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const About = () => {
  const {user} = useAuth();
  return (
    <>
        <main className='contact-about'>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
            <p> Hii 👋 and welcome {user? user.username : ""}!</p>
              <h1>Why Choose Us? </h1>
              <p>
                Expertise: Lorem, ipsum dolor sit amet consectetur adipisicing elit. In saepe voluptatem modi ad ipsam id perspiciatis incidunt! Alias, laboriosam commodi.
              </p>
              <p>
                Customization: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, consequatur? Repellat nihil officia hic rerum non assumenda magnam. Voluptatum, eligendi.
              </p>
              <p>
                Customer-Centric Approach: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et quisquam ab facilis expedita saepe sed.
              </p>
              <p>
                Affordability: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta iusto est minima sapiente.
              </p>
              <p>
                Reliability: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis unde nulla tempora dolorum ratione exercitationem voluptatem cupiditate ullam id a.
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn"> Connect Now</button>
                </NavLink>
                <NavLink to="/service">
                <button className="btn secondary-btn">learn more</button>
                </NavLink>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/about.png"
                alt="coding buddies "
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      <Analytics /> 
    </>
  )
}

export default About