import React from "react";
import Ingredient from "./Ingredient/Ingredient";
import classes from "./Burger.module.css";

const burger = props => {
    // take ingredients object, transform to array
    let ingredients = Object.keys(props.ingredients)
        .map(ingredient => {  // map ingredient to array
           return [...Array(props.ingredients[ingredient])]
               .map((_, index) => {  // map the quantity of ingredient
                   return <Ingredient key={ingredient+index} type={ingredient} />;
               });
        })
        // flatten the array
        .reduce((array, element) => {
            return array.concat(element);
        }, []);

    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default burger;
