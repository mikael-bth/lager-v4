import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList';
import ShipOrder from './ShipOrder';

const Stack = createNativeStackNavigator();

export default function Shipping(props) {
    return (
        <Stack.Navigator initialRouteName="Ship">
            <Stack.Screen name="Packade orders">
                {(screenProps) => <ShipList {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Skica order">
                {(screenProps) => <ShipOrder {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};