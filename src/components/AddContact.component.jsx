import {useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm.component";
import ContactsModify from "./ModifyComponent.component";
function ContactsAdd(props) {

  const initialContact =
  {
    firstName: "",
    lastName: "",
    street: "",
    city: ""
  }
  const { contacts, setContacts } = props
  const [contact, setContact] = useState(initialContact);
 const navigate = useNavigate();
  
  const updateData = () => {
 
    const addContact = async (contact) => {
    
      try{
        await fetch("http://localhost:4000/contacts",
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact)
        });
        setContacts([...contacts, contact])
      //const content = await rawResponse.json();
      }catch(err){
          console.log(err);
      }
    }
   
      addContact(contact);
  }
  

  const setValue = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setContact({ ...contact, [key]: value });
  }
   const handleSubmit = (e) => {
    e.preventDefault();
    updateData();
    navigate("/",{ contacts });
   }
/*
  <ContactsModify  
    contacts={contacts} setContacts={setContacts}
    contact={contact} setContact={setContact} updateData={updateData}/>   
  
*/

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
    <ContactForm contact={contact} setValue={setValue} />
  </form>

   

  )
}

export default ContactsAdd