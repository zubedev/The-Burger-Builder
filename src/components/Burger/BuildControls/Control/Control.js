import React from "react";
import classes from "./Control.module.css";

const control = props => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button  // remove ingredient
            className={classes.Less}
            onClick={props.less}
            disabled={props.remDisabled}
        >Less</button>
        <button  // add ingredient
            className={classes.More}
            onClick={props.more}
            disabled={props.addDisabled}
        >More</button>
    </div>
);

export default control;
