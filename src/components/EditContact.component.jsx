import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm.component";
import ContactsModify from "./ModifyComponent.component";

function ContactsEdit(props) {
  const { contacts, setContacts } = props
  const [contact, setContact] = useState("");

  const location = useLocation();
  const { id } = useParams();
 
  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    }
  }, []);

  const updateData = (contact,contacts=[]) => {
    const editContact = async (contact) => {
      try {
        await fetch(`http://localhost:4000/contacts/${id}`,
          {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
          });
          const updateContacts = contacts.map(element => {
            return element.id == id ? contact : element;
          })
          console.log('updateContacts Edit', updateContacts);
          setContacts(updateContacts);
      } catch (err) {
        console.log(err);
      }
    }
  
    editContact(contact)

  }
  return (
    <ContactsModify
      contacts={contacts} setContacts={setContacts}
      contact={contact} setContact={setContact} updateData={updateData} />
  )
}

export default ContactsEdit