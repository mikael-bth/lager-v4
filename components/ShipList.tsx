import { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import orderModel from "./../models/orders";
import { Orders, Deliveries } from './../styles';

export default function ShipList({ route, navigation }) {
    let { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);

    if (reload) {
        reloadOrders();
        reload = false;
    }

    async function reloadOrders() {
        const orders = await orderModel.getOrders();
        setAllOrders(orders);
    }

    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Skickad")
        .map((order, index) => {
            return (
            <View key={index} style={Deliveries.delivery}>
                <Text style={Deliveries.header}>Namn: {order.name}</Text>
                <Text style={Deliveries.normal}>Adress: {order.adress}</Text>
                <Text style={Deliveries.normal}>Stad-ZIP: {order.city}-{order.zip}</Text>
                <Text style={Deliveries.normal}>Land: {order.country}</Text>
            </View>
            );
        });

    return (
        <View style={[Orders.container, {alignItems: "center"}]}>
            {listOfOrders}
        </View>
    );
}