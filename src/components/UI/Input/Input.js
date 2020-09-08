import React from "react";
import classes from "./Input.module.css";

const input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid  && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(" ")}
                value={props.value}
                {...props.elementConfig}
                onChange={props.inputChange}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(" ")}
                value={props.value}
                {...props.elementConfig}
                onChange={props.inputChange}
            />
            break;
        case ('select'):
            inputElement = <select
                className={inputClasses.join(" ")}
                value={props.value}
                onChange={props.inputChange}
                >{props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >{option.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
            inputElement = <input
                className={inputClasses.join(" ")}
                value={props.value}
                {...props.elementConfig}
                onChange={props.inputChange}
            />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;
