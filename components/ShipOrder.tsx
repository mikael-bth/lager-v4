import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Base, Typography } from "./../styles";

import MapView from 'react-native-maps';
import { Marker } from "react-native-maps";

import getCoordinates from "./../models/nominatim";


export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            if (typeof results[0].lat == 'undefined') {
                setMarker(<Marker
                    coordinate={{ latitude: 56.17, longitude: 15.59 }}
                    title="not valid address"
                />);
                
            } else {
                setMarker(<Marker
                    coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                    title={results[0].display_name}
                />);
            }
        })();
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>
            <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
                {marker}
            </MapView>
            </View>
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