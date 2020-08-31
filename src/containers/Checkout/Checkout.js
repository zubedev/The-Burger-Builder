import React from "react";
import {Route} from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends React.Component {
    state = {
        ingredients: null,
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let params of query.entries()) {
            ingredients[params[0]] = +params[1];
        }
        this.setState({ingredients: ingredients});
    }

    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        let checkoutSummary = <Spinner />
        if (this.state.ingredients) {
            checkoutSummary = <CheckoutSummary
                ingredients={this.state.ingredients}
                checkoutCancel={this.checkoutCancel}
                checkoutContinue={this.checkoutContinue}
            />
        }

        return (
            <div>
                {checkoutSummary}
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        );
    }
}

export default Checkout;
