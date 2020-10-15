import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends React.Component {
    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render() {
        let checkoutSummary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased
                ? <Redirect to="/" />
                : null
            checkoutSummary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutCancel={this.checkoutCancel}
                        checkoutContinue={this.checkoutContinue}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return checkoutSummary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    };
}

export default connect(mapStateToProps)(Checkout);
