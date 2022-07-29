import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function ContactsList(props) {

  //"contacts" must be passed as prop to this component
  const { contacts } = props

  return (
    <>
      <header>
        <h2>Contacts</h2>
      </header>
      <ul className="contacts-list">
        {contacts.map((contact, index) => {
          const { firstName, lastName } = contact
          return (
            <div key={index} className="contact-container">
              <Link to={`/contact/${contact.id}`} state={{ contact }}>
                {firstName} {lastName} 
              </Link>
              <Link to={`/contact/${contact.id}/meetings`} state={{ contact }}>
              <li>meetings</li>
              </Link>
              <Link to={`/editContact/${contact.id}`} state={{ contact }}>
                <button>Edit</button><br/>
              </Link>
              <Link to={`/deleteContact/${contact.id}`} state={{ contact }}>
                <li>Delete</li>
              </Link>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
