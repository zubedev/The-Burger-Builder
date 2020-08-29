import React from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends React.Component {
    state = {
        ingredients : {
            cheese: 0,
            meat: 0,
            bacon: 0,
            salad: 0,
        },
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
            </Aux>
        );
    }
}

export default BurgerBuilder;
