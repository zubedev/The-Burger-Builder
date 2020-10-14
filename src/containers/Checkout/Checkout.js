import React from "react";
import {connect} from "react-redux";
import {Route} from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends React.Component {
    checkoutCancel = () => {
        this.props.history.goBack();
    }

    checkoutContinue = () => {
        this.props.history.push("/checkout/contact-data");
    }

    render() {
        let checkoutSummary = <Spinner />
        if (this.props.ings) {
            checkoutSummary = <CheckoutSummary
                ingredients={this.props.ings}
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

const mapStateToProps = state => {
    return {ings: state.ingredients};
}

export default connect(mapStateToProps)(Checkout);
