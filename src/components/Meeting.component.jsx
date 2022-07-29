import { useCallback, useEffect, useState } from "react"
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

const Meeting = (props) => {
    const {contacts,setContacts}= props;
  const initialContact =
  {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    meeting:[]
  }
    const initialMeeting = {
        date: "",
        content: "",
        time: "",
        location: "",
    }
    const [meeting, setMeeting] = useState([]);
    const [contact, setContact] = useState(initialContact);
    const { date, content, time, location } = meeting;

    const [meetings, setMeetings] = useState([]);
 
    const  mylocation = useLocation();
    const  paramId = useParams().id;
   
    //const navigate = useNavigate();
    useEffect(() => {
        if (mylocation.state) {
            const { contact } = mylocation.state;
            setContact({...contact,["meetings"]: meetings});
        }
    }, []);


    const addIndividualMeeting = async () => {

        setMeetings([...meetings,meeting])
      
        setContact( {contact,['meetings']:meetings});
        console.log('meetings',meetings);
        console.log('contact',contact);
        try {
            const response = await fetch(`http://localhost:4000/contacts/${paramId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contact)
                });
            if (response) {
                console.log(response.status, response);
            }
           
           const updateContacts = contacts.map((element)=>{
            if(element.id == paramId){
                return contact;
            }
            return element;
           })
           console.log('updateContats',updateContacts);
           setContacts([...updateContacts]);
            setMeeting(initialMeeting);
        } catch (err) {
            console.log(err);
        }
    }
    const setValue = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setMeeting({ ...meeting, [key]: value });
       
    }

    const handleSubmit = (e) => {
        console.log('meeting', meeting);
        e.preventDefault();
        addIndividualMeeting();
    }

    return (
        <>
            <h2>Add a new setMeeting</h2>
            <form className="form-stack contact-form" >

                <label htmlFor="content">Title</label>
                <input id="content" name="content" value={content} type="text" onChange={(e) => setValue(e)} required />

                <label htmlFor="date">Date</label>
                <input id="date" name="date" value={date} type="date" onChange={(e) => setValue(e)} required />

                <label htmlFor="time">Time</label>
                <input id="time" name="time" value={time} type="time" onChange={(e) => setValue(e)} required />

                <label htmlFor="location">Location</label>
                <input id="location" name="location" value={location} type="text" onChange={(e) => setValue(e)} required />

                <button type="submit" onClick={handleSubmit}> Add new setMeeting </button>


            </form>

            <h2>Your setMeetings</h2>
            <ul>
                {meetings && meetings.map((element, index) => {
                    const { content, date, time, location } = element;
                    return (
                        <li key={index}>
                            <p><strong>{content}</strong></p>
                            <p>Date: {date}</p>
                            <p>Time: {time}</p>
                            <p>Location: {location}</p>

                        </li>

                    )
                })}

            </ul>
        </>
    )
}
export default Meeting;