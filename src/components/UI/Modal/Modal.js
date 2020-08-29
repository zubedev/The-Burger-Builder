import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const modal = props => (
    <Aux>
        <Backdrop show={props.show} click={props.dismiss} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'transformY(0)' : "transformY(-100vh)",
                opacity: props.show ? '1' : 0,
            }}
        >
            {props.children}
        </div>
    </Aux>
);

export default modal;
