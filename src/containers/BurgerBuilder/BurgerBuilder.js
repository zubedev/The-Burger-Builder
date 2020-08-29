import React from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3,
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        canOrder: false,
        isOrdering: false,
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

        return (
            <Aux>
                <Modal show={this.state.isOrdering}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
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
        );
    }
}

export default BurgerBuilder;
