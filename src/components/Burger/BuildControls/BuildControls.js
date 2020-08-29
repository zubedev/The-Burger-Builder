import React from "react";
import Control from "./Control/Control";
import classes from "./BuildControls.module.css";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        {controls.map(control => (
            <Control
                key={control.label}
                label={control.label}
                more={() => props.addIngredient(control.type)}
                less={() => props.remIngredient(control.type)}
                remDisabled={props.buttonsRemDisabled[control.type]}
                addDisabled={props.buttonsAddDisabled[control.type]}
            />
        ))}
    </div>
);

export default buildControls;
