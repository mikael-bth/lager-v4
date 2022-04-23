import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import deliveryModel from "./../models/delivery";
import { Base, Typography, Deliveries } from './../styles';

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
        <View style={[Base.base, {alignItems: "center"}]}>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Ny inleverans');
                }}
            />
        </View>
    );
}