import React from "react"
import DrawerToggle from "../SideDrawer/Toggle/Toggle";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import classes from "./Toolbar.module.css";

const toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.openSideDrawer} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav>
            <NavItems />
        </nav>
    </header>
);

export default toolbar;
