const ContactForm = (props) => {

    const { firstName, lastName, street, city } = props.contact;
    const { setValue } = props;
   
    return (
        <>
            <h2>Create Contact</h2>

            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" required
                onChange={(e)=>setValue(e)} value={firstName ? firstName : ""} />

            <label htmlFor="lastName">Last Name:</label>
            <input id="lastName" name="lastName" type="text" required
                onChange={(e)=>setValue(e)} value={lastName ? lastName : ""} />

            <label htmlFor="street">Street:</label>
            <input id="street" name="street" type="text" required
                onChange={(e)=>setValue(e)} value={street ? street : ""} />

            <label htmlFor="city">City:</label>
            <input id="city" name="city" type="text" required
                onChange={(e)=>setValue(e)} value={city ? city : ""} />

            <div className="actions-section">

                <button className="button blue" type="submit">
                    Create
                </button>
            </div>
        </>
    )
}
export default ContactForm;