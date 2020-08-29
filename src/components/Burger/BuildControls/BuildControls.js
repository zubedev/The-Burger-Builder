import React from "react";
import Control from "./Control/Control";
import classes from "./BuildControls.module.css";

const controls = [
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Salad', type: 'salad'},
]

const buildControls = props => (
    <div className={classes.BuildControls}>
        {controls.map(control => (
            <Control key={control.label} label={control.label} />
        ))}
    </div>
);

export default buildControls;
