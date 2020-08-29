import React from "react";
import Aux from "../../../hoc/Auxiliary";

const orderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(ingredient => {
           return <li key={ingredient}>
               <span style={{textTransform: 'capitalize'}}>{ingredient}</span>: {props.ingredients[ingredient]}
           </li>
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with ingredients:</p>
            <ul>{ingredientsSummary}</ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
};

export default orderSummary;
