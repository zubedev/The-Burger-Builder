import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients : null,
        totalPrice: 4,
        canOrder: false,
        isOrdering: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get("ingredients.json").then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error: true})
        })
    }

    updateCanOrderState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredient => {
                return ingredients[ingredient];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);
        this.setState({canOrder: sum > 0})
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;

        // use spread to make sure not to mutate the original ingredients
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        // update the price addition
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // finally setState
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        // update Order Now button state
        this.updateCanOrderState(updatedIngredients);
    }

    remIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;  // exits handler if the ingredient of the type is already 0
        }
        const newCount = oldCount - 1;

        // use spread to make sure not to mutate the original ingredients
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        // update the price reduction
        const priceReduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceReduction;

        // finally setState
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });

        // update Order Now button state
        this.updateCanOrderState(updatedIngredients);
    }

    isOrderingHandler = () => {
        this.setState({isOrdering: true})
    }

    cancelOrderingHandler = () => {
        this.setState({isOrdering: false})
    }

    continueOrderingHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i])
            )
        }
        const queryString = queryParams.join("&")
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        });
    }

    render() {
        // check if any build control button needs to be disabled
        const buttonsRemDisabled = {...this.state.ingredients};
        for (let key in buttonsRemDisabled) {
            buttonsRemDisabled[key] = buttonsRemDisabled[key] <= 0;
        }
        const buttonsAddDisabled = {...this.state.ingredients};
        for (let key in buttonsAddDisabled) {
            buttonsAddDisabled[key] = buttonsAddDisabled[key] >= 9;
        }

        // show Order Summary or loading spinner
        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            clickCancel={this.cancelOrderingHandler}
            clickContinue={this.continueOrderingHandler}
        />
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        // check if ingredients are loaded else show spinner
        let burgerBuilder = this.state.error
            ? <p>The Burger Builder can not be loaded, something went wrong!</p>
            : <Spinner />
        if (this.state.ingredients) {
            burgerBuilder = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        addIngredient={this.addIngredientHandler}
                        remIngredient={this.remIngredientHandler}
                        buttonsRemDisabled={buttonsRemDisabled}
                        buttonsAddDisabled={buttonsAddDisabled}
                        canOrder={this.state.canOrder}
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

export default withErrorHandler(BurgerBuilder, axios);
