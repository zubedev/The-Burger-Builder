import React from "react";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";

class Orders extends React.Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount() {
        axios.get("orders.json").then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    id: key, ...response.data[key]
                })
            }
            this.setState({orders: fetchedOrders, loading: false})
        }).catch(() => {
            this.setState({loading: false})
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={+order.totalPrice}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
