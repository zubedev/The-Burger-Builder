import React from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

class Modal extends React.PureComponent {
    render() {
        return (
            this.props.show ? <Aux>
                <Backdrop show={this.props.show} click={this.props.dismiss}/>
                <div className={classes.Modal}>{this.props.children}</div>
            </Aux> : null
        );
    }
}

export default Modal;
