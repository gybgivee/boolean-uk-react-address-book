import { useEffect , useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import ContactsList from "./ContactsList";

function ContactDelete(props) {
    const { contacts, setContacts } = props
    const [contact, setContact] = useState("");
    const { id } = useParams();
    const location = useLocation();
   
   useEffect(()=>{
    if (location.state) {
        const { contact } = location.state;
        setContact(contact);
        deleteContact()
      } 
     
   }
   ,[])
    const deleteContact = async () => {
        try{
            await fetch(`http://localhost:4000/contacts/${id}`,
            {
                method: 'DELETE',
            });
            const updateContacts = contacts.filter(element => {
               //if(element.id != id)return element;
               return element.id != id;
            })
            console.log('updateContacts', updateContacts);
            setContacts(updateContacts);

        }catch(err){
            console.log(err);
        }
       
    }
   
  
    return (
        <ContactsList contacts={contacts} />
    )
}

export default ContactDelete