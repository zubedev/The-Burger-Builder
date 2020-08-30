import React from "react";
import classes from "./Toggle.module.css";

const toggle = props => (
    <div
        className={classes.DrawerToggle}
        onClick={props.click}
    >
        <div /><div /><div />
    </div>
);

export default toggle;
