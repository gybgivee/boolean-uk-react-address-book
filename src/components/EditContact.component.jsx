import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm.component";


function ContactsEdit(props) {

  
  const { contacts, setContacts } = props
  const [contact, setContact] = useState("");

  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    } 
  }, []);

  const editContact = async (contact) => {
    try{
        await fetch(`http://localhost:4000/contacts/${id}`,
        {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(contact)
        });
     
    }catch(err){
        console.log(err);
    }
  }
  const updateData = () => {

    const updateContacts = contacts.map(element => {
    return element.id == id ? contact : element;})
      console.log('updateContacts Edit', updateContacts);
      setContacts(updateContacts);
      editContact(contact)
     
    }
  
    const setValue = (e) => {
      console.log('call setValue');
      const key = e.target.id;
      const value = e.target.value;
      setContact({ ...contact, [key]: value });
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
      updateData();
      navigate("/",{ contacts });
    }
  
  
    return (
  
      <form className="form-stack contact-form" onSubmit={handleSubmit}>
        <ContactForm contact={contact} setValue={setValue} />
      </form>
  
    )
}

export default ContactsEdit