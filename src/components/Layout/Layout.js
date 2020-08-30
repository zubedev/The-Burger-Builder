import React from "react";
import Aux from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css"

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    render() {
        return (
            <Aux>
                <Toolbar
                    openSideDrawer={this.sideDrawerOpenHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerCloseHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
