import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Shipping() {
    return (
        <Stack.Navigator initialRouteName="Ship">
            <Stack.Screen name="Skickade orders" component={ShipList} />
            <Stack.Screen name="Skica order" component={ShipOrder} />
        </Stack.Navigator>
    );
};