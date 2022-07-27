import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm.component";

function ContactsAdd(props) {

  const initialContact =
  {
    firstName: null,
    lastName: null,
    street: null,
    city: null
  }
  const {contacts, setContacts} = props
  const [contact, setContact] = useState(initialContact);
  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    } else {
      setContact(initialContact);
    }
  }, []);
  

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const pathname = location.pathname.split("/")[1];

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
  const editContact = async (contact) => {
    const rawResponse = await fetch(`http://localhost:4000/contacts/${id}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });
    const content = await rawResponse.json();

  }
  const updateData = () => {

    if (pathname === 'editContact') {
     const updateContacts = contacts.map(element=>{
      if(element.id === id){
        element = {...initialContact};
      }
      return element;
     })
     setContacts([...updateContacts]);
      editContact(initialContact)
     
    } else {
      setContacts([...contacts, contact])
      addContact(initialContact);
    
    }

  }
  const setValue = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    console.log('vaue',value);
    initialContact[key] = value;
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
