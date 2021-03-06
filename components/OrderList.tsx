import { useState, useEffect } from 'react';
import { View, Text, Pressable } from "react-native";
import orderModel from "./../models/orders";
import { Orders } from './../styles';

export default function OrderList({ route, navigation, allOrders, setAllOrders }) {
    let { reload } = route.params || false;

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
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return (
            <Pressable
                key={index}
                style={Orders.order}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            >
                <Text style={Orders.orderText}>{order.name}</Text>
            </Pressable>
            );
        });

    return (
        <View style={[Orders.container, {alignItems: "center"}]}>
            {listOfOrders}
        </View>
    );
}