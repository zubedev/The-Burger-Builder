import React from "react";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.module.css";

class ContactData extends React.Component {
    state = {
        customer: {
            name: "Zubair Beg",
            email: "ziibii88@gmail.com",
            address: {
                street: "My Street Number",
                suburb: "My Beautiful Suburb",
                city: "My Awesome City",
                postal: "No Postoffice found",
            },
        },
        loading: false,
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            customer: this.state.customer,
            deliveryMode: "fastest",
        }
        axios.post("orders.json", order).then(() => {
            this.setState({loading: false});
            this.props.history.replace("/");
        }).catch(() => {
            this.setState({loading: false});
        })
    }

    render() {
        let form = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="email" placeholder="Your Email" />
                <input type="text" name="street" placeholder="Street" />
                <input type="text" name="suburb" placeholder="Suburb" />
                <input type="text" name="city" placeholder="City" />
                <input type="text" name="postal" placeholder="Postal" />
                <Button
                    btnType="Success"
                    click={this.orderHandler}
                >ORDER
                </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;
