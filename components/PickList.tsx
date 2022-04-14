import { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert } from "react-native";
import orderModel from "./../models/orders";
import productModel from "./../models/products";
import { Typography, Orders } from './../styles';

export default function PickList({ route, navigation }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([]);
    let pickable = true
    let notStockedList = [];

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        if (pickable) {
            await orderModel.pickOrder(order);
            navigation.navigate("Orders", { reload: true });
        } else {
            console.log("unpickable")
            Alert.alert(
                "ERROR",
                `Not enough of ${notStockedList.join(", ")} in stock`,
                [
                    {
                        text: "Close",
                        style: "cancel"
                    }
                ]
            );
        }
    }

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.stock - item.amount < 0){
            pickable = false;
            notStockedList.push(item.name);
        }
        return <Text
                key={index}
                style={{ ...Typography.normal }}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View style={[Orders.container, {alignItems: "center"}]}>
            <Text style={{ ...Typography.header3 }}>{order.name}</Text>
            <Text style={{ ...Typography.normal }}>Adress: {order.address}</Text>
            <Text style={{ ...Typography.normal }}>Stad: {order.zip} {order.city}</Text>

            <Text style={{ ...Typography.header3 }}>Produkter:</Text>
            <Text style={{ ...Typography.normal }}>Namn - Antal - Hylla</Text>

            {orderItemsList}

            <Pressable style={Orders.pickOrder} onPress={pick}>
                <Text style={Orders.pickOrderText}>Plocka Order</Text>
            </Pressable>
        </View>
    )
};