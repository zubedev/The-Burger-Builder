import React from "react";
import {connect} from "react-redux";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";

class BurgerBuilder extends React.Component {
    state = {isOrdering: false}

    componentDidMount() {this.props.onInitIngredients();}

    updateCanOrderState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredient => {
                return ingredients[ingredient];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        return  sum > 0
    }

    isOrderingHandler = () => {
        this.setState({isOrdering: true})
    }

    cancelOrderingHandler = () => {
        this.setState({isOrdering: false})
    }

    continueOrderingHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    }

    render() {
        // check if any build control button needs to be disabled
        const buttonsRemDisabled = {...this.props.ings};
        for (let key in buttonsRemDisabled) {
            buttonsRemDisabled[key] = buttonsRemDisabled[key] <= 0;
        }
        const buttonsAddDisabled = {...this.props.ings};
        for (let key in buttonsAddDisabled) {
            buttonsAddDisabled[key] = buttonsAddDisabled[key] >= 9;
        }

        // show Order Summary or loading spinner
        let orderSummary = <OrderSummary
            ingredients={this.props.ings}
            totalPrice={this.props.price}
            clickCancel={this.cancelOrderingHandler}
            clickContinue={this.continueOrderingHandler}
        />

        // check if ingredients are loaded else show spinner
        let burgerBuilder = this.props.error
            ? <p>The Burger Builder can not be loaded, something went wrong!</p>
            : <Spinner />
        if (this.props.ings) {
            burgerBuilder = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        totalPrice={this.props.price}
                        addIngredient={this.props.onIngredientAdded}
                        remIngredient={this.props.onIngredientRemoved}
                        buttonsRemDisabled={buttonsRemDisabled}
                        buttonsAddDisabled={buttonsAddDisabled}
                        canOrder={this.updateCanOrderState(this.props.ings)}
                        clickOrder={this.isOrderingHandler}
                    />
                </Aux>
            )
        }

        return (
            <Aux>
                <Modal
                    show={this.state.isOrdering}
                    dismiss={this.cancelOrderingHandler}
                >
                    {orderSummary}
                </Modal>
                {burgerBuilder}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
