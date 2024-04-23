import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Analytics from '../components/Analytics'


const Home = () => {
  return (
    <>
        <main className='home-section'>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Hello 👋 I'm Satabdisundar Behera</p>
              <h1>Welcome to this landing page</h1>
              <p>
                This is just a landing page that I have created as a merstack project with complete admin panel facility where you can manage the users and also do some additional stuffs. I also have other projects on my github and they are awesome too, hope you will like it...
              </p>
              <div className="btn btn-group">
                <NavLink to="/contact">
                  <button className="btn">Connect now</button>
                </NavLink>
                <NavLink to="/service">
                  <button className="btn secondary-btn">Learn more</button>
                </NavLink>
              </div>
            </div>

            
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="500"
                height="500"
              />
            </div>
          </div>
        </section>
      </main> 

      <Analytics/>

      <section className="section-hero">
        <div className="container grid grid-two-cols">
          <div className="hero-image">
            <img
              src="/images/design.png"
              alt="coding together"
              width="400"
              height="500"
            />
          </div>

          <div className="hero-content">
            <p>Please check out my GitHub</p>
            <h1>Thanks for visiting</h1>
            <p>
              I'm basically a software developer based in India. I've got the skills to develope dynamic websites using technologies like MERN stack and other sort of things...
            </p>
            <div className="btn btn-group">
              <NavLink to="/contact">
                <button className="btn">Connect now</button>
              </NavLink>
              <NavLink to="/service">
                <button className="btn secondary-btn">Learn more</button>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home