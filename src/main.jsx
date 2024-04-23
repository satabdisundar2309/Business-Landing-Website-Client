import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/authContext.jsx";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthProvider>
   <React.StrictMode>
    <div className="containerX">
      <App />
    </div>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        bodyClassName="toastBody"
      />
  </React.StrictMode>
 </AuthProvider>
);
