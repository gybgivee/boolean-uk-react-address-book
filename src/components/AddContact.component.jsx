import { useState } from "react"
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
 
  const updateData = (contact,contacts) => {
 
    const addContact = async (contact,contacts) => {
    
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
   
      addContact(contact,contacts);
  }

  return (
   
    <ContactsModify  
    contacts={contacts} setContacts={setContacts}
    contact={contact} setContact={setContact} updateData={updateData}/>   
  

  )
}

export default ContactsAdd