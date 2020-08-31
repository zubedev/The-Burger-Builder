import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";

class ContactData extends React.Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            suburb: "",
            city: "",
            postal: "",
        },
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="suburb" placeholder="Suburb" />
                    <input type="text" name="city" placeholder="City" />
                    <input type="text" name="postal" placeholder="Postal" />
                    <Button btnType="Success" click>ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;
