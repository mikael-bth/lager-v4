import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Base, Typography, Forms } from "./../styles";
import orderModel from "./../models/orders";
import config from "./../config/config.json";

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";
import * as Location from 'expo-location';

import getCoordinates from "./../models/nominatim";


export default function ShipOrder({ route, navigation }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);

    const [startPos, setStartPos] = useState({
        latitude: 56.1612,
        longitude: 15.5869
    });

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            if (results.length == 0) {
                setMarker(<Marker
                    coordinate={{ latitude: 56.17, longitude: 15.59 }}
                    title="not valid address"
                />);
            } else {
                setMarker(<Marker
                    coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                    title={results[0].display_name}
                />);
                setStartPos({
                    latitude: parseFloat(results[0].lat),
                    longitude: parseFloat(results[0].lon)
                });
            }

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    async function sendOrder() {
        const updatedOrder = {
            ...order,
            status_id: 400,
            api_key: config.api_key
        };
    
        await orderModel.updateOrder(updatedOrder);
        navigation.navigate("Packade orders", { reload: true });
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{order.id} | {order.name}</Text>
            <Text style={Typography.header3}>Platsinformation</Text>
            <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                region={{
                    latitude: startPos.latitude,
                    longitude: startPos.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                }}
                >
                {marker}
                {locationMarker}
            </MapView>
            </View>
            <Pressable
                style={Forms.button}
                onPress={sendOrder}
            >
                <Text style={Forms.buttonText}>Skicka order</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});