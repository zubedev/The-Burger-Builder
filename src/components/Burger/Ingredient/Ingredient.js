import React from "react";
import classes from "./Ingredient.module.css";

const ingredient = (props) => {
    let ingredient;

    switch (props.type) {
        case ("bread-bottom"):
            ingredient = <div className={classes.BreadBottom} />;
            break;
        case ("bread-top"):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1} />
                    <div className={classes.Seeds2} />
                </div>
            );
            break;
        case ("meat"):
            ingredient = <div className={classes.Meat} />;
            break;
        case ("cheese"):
            ingredient = <div className={classes.Cheese} />;
            break;
        case ("bacon"):
            ingredient = <div className={classes.Bacon} />;
            break;
        case ("salad"):
            ingredient = <div className={classes.Salad} />;
            break;
        default:
            ingredient = null;
    }

    return ingredient;
};

export default ingredient;
