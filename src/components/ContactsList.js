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
            <div className="contact-container">
              <Link to={`/contact/${contact.id}`} state={{ contact }}>
                {firstName} {lastName} 
              </Link>
              <Link to={`/edit/${contact.id}`} state={{ contact }}>
                <button>Edit</button><br/>
              </Link>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default ContactsList
