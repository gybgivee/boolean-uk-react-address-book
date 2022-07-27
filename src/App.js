import { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import ContactsList from "./components/ContactsList"
import ContactsAdd from "./components/ContactsAdd"
import ContactsView from "./components/ContactsView"
import "./styles/styles.css"

export default function App() {

  const [contacts, setContacts] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/contacts")
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setContacts(data);
      })
      .catch((error) => console.log(error));
  }, [])

  return (
    <>
      <nav>
        <h2>Menu</h2>
        <ul>
        <li><Link to="/">Contacts List</Link></li>
      
        <li><Link to="/addContact">Add New Contact</Link></li>
        
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<ContactsList contacts={contacts} />} />
          <Route path="/contact/:id" element={<ContactsView />} />
          <Route path="/addContact" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>}></Route>
          <Route path="/editContact/:id" element={<ContactsAdd contacts={contacts} setContacts={setContacts}/>}></Route>
        </Routes>
      </main>
    </>
  )
}
