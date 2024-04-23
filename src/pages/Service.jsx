import React from "react";
import { useAuth } from "../context/authContext";

const Service = () => {
  const { user, services } = useAuth();

  return (
    <section className="service-section">
      <section className="section-services">
        <div className="container">
          <h1 className="main-heading">Our Services</h1>
        </div>
        <div className="container grid grid-three-cols">
          {user ? (
            services.map((service) => {
              return <div className="card" key={service._id}>
                <div className="card-img">
                  <img
                    src="/images/servicex.png"
                    alt="services image"
                    width={500}
                  />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{service.provider}</p>
                    <p>{service.price}</p>
                  </div>
                  <h2>{service.service}</h2>
                  <p>{service.description}</p>
                </div>
              </div>;
            })
          ) : (
            <h1>Login/Sign-up to see services</h1>
          )}
        </div>
      </section>
    </section>
  );
};

export default Service;
