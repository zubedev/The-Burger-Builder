import React from "react";
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const modal = props => (
    props.show ? <Aux>
        <Backdrop show={props.show} click={props.dismiss} />
        <div className={classes.Modal}>{props.children}</div>
    </Aux> : null
);

export default modal;
