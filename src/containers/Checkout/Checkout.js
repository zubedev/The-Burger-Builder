import React from "react";
import {Route} from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let totalPrice = 0;
        for (let params of query.entries()) {
            if (params[0] === "totalPrice") {
                totalPrice = params[1];
            } else {
                ingredients[params[0]] = +params[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: totalPrice});
    }

    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.push("/checkout/contact-data");
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
                    render={() => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            {...this.props}
                        />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;
