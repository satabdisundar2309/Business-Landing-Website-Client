import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/authContext";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

const AdminContacts = () => {
  const { AuthorizationToken } = useAuth();
  const [contacts, setContacts] = useState([]);

  const getAllContacts = async ()=>{
    try {
      const response = await fetch("https://business-landing-website-server.onrender.com/api/v1/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      const data = await response.json();
      setContacts(data.contacts);
    } catch (error) {
      console.log(error)
    }
  }

  const deleteMessage = async (id)=>{
    try {
      const response = await fetch(`https://business-landing-website-server.onrender.com/api/v1/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: AuthorizationToken,
        }
      })
      if(response.ok){
        toast.success("Message Deleted")
        getAllContacts()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getAllContacts();
  }, [])
  if(contacts.length === 0){
    return <h1>No Messages</h1>
  }
  return (
    <>
      <section className="admin-user-section">
        <section className="admin-users-section">
            <h1>Messages</h1>
          <div className="container grid grid-four-cols">
              {contacts.map((contact) => {
                return (
                  <div key={contact._id} className="card">
                    <p><strong>Name</strong>: {contact.username}</p>
                    <p><strong>Email</strong>: {contact.email}</p>
                    <p className='word-wrap'><strong>Message</strong>: {contact.message}</p>
                    <div className="grid grid-two-cols">
                    <button
                      className="btn"
                      onClick={()=>{
                        deleteMessage(contact._id)
                      }}
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
  )
}

export default AdminContacts