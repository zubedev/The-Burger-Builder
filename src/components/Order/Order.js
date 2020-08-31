import React from "react";
import classes from "./Order.module.css";

const order = props => {
    const ingredients = [];
    for (let i in props.ingredients) {
        ingredients.push({
            name: i, amount: props.ingredients[i]
        })
    }
    const ingredientsHTML = ingredients.map(i => {
        return <span
            key={i.name}
            style={{
                textTransform: "capitalize",
                display: "inline-block",
                margin: "0 8px",
                border: "1px solid #ccc",
                padding: "5px"
            }}
        >{i.name} ({i.amount})
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsHTML}</p>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;
