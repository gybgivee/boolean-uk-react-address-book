import { useCallback, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm.component";

function ContactsAdd(props) {

  const initialContact =
  {
    firstName: null,
    lastName: null,
    street: null,
    city: null
  }
  const { setContacts, contacts } = props
  const [contact, setContact] = useState(initialContact);
  const navigate = useNavigate();

  const addContact = async (contact) => {
    const rawResponse = await fetch("http://localhost:4000/contacts",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
    const content = await rawResponse.json();
   
  }
  const updateData = ()=>{

    setContacts([...contacts,contact])
    addContact(contact);
  }
  const setValue = (e) => {
    const key = e.target.id;
    const value = e.target.value;
   setContact({ [key]: value})
}

 
  const handleSubmit = (e) => {
    (async () => {
      e.preventDefault();
      await updateData();
      navigate("/");
    })();

  }


  return (

    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <ContactForm contact={contact} setValue={setValue} />
    </form>

  )
}

export default ContactsAdd
