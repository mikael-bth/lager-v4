import { useState, useEffect } from 'react';
import { View, ScrollView, Text, Pressable } from "react-native";
import deliveryModel from "./../models/delivery";
import { Base, Typography, Deliveries, Forms } from './../styles';

export default function DeliveriesList({ route, navigation }) {
    let { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
        reload = false;
    }

    async function reloadDeliveries() {
        const deliveries = await deliveryModel.getDeliveries();
        setAllDeliveries(deliveries);
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    let listOfDeliveries = allDeliveries
        .map((delivery, index) => {
            return (
            <View key={index} style={Deliveries.delivery}>
                <Text style={Deliveries.header}>{delivery.product_name}: {delivery.amount}</Text>
                <Text style={Deliveries.normal}>Kommentar: {delivery.comment}</Text>
                <Text style={Deliveries.normal}>Datum: {delivery.delivery_date}</Text>
            </View>
            );
        });

    if (listOfDeliveries.length == 0) {
        listOfDeliveries.push(<Text key={0} style={Typography.header3}>Inga leveranser</Text>)
    }

    return (
        <ScrollView style={Base.base}>
            <View style={{alignItems: "center"}}>
                {listOfDeliveries}
                <Pressable
                style={Forms.button}
                onPress={() => {
                    navigation.navigate('Ny inleverans');
                }}
                >
                    <Text style={Forms.buttonText}>Skapa ny inleverans</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}