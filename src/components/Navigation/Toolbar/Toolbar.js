import React from "react"
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.module.css";

const toolbar = props => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            <ul>
                ...
            </ul>
        </nav>
    </header>
);

export default toolbar;
