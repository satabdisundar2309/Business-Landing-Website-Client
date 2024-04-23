import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isLoggedin = !!token; //it will set isLoggedin true if there is a value of token otherwise it will set false

  const [adminLoading, setAdminLoading] = useState(true)

  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);

  const AuthorizationToken = `Bearer ${token}`;

  // storing token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken); //this will sort out the login toggle problem
    localStorage.setItem("token", serverToken);
  };

  // user logOut
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      setAdminLoading(true)
      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/user", {
        headers: {
          Authorization: AuthorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setAdminLoading(false)
        console.log(user);
      }
      else{
        setAdminLoading(false)
      }
    } catch (error) {
      console.log("Error in user Authentication", error);
    }
  };

  // to fetch the services that we provide
  const getServices = async () => {
    try {
      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/services");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setServices(data.services);
      }
    } catch (error) {
      console.log(`Services store error: ${error}`);
    }
  };

  // getting authentication and user data who logged in
  useEffect(() => {
    userAuthentication();
    getServices();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeTokenInLS,
        LogoutUser,
        isLoggedin,
        user,
        services,
        AuthorizationToken,
        adminLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
