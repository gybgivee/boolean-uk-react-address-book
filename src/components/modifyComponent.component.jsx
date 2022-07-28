import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm.component";

function ContactsModify(props) {
  const { contacts, setContacts } = props;
  const { updateData, contact, setContact } = props
  const navigate = useNavigate();

  const setValue = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setContact({ ...contact, [key]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
    navigate("/", contacts = { contacts });
  }


  return (

    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <ContactForm contact={contact} setValue={setValue} />
    </form>

  )
}

export default ContactsModify