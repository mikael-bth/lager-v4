import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrderList from './OrderList';
import PickList from './PickList';

const Stack = createNativeStackNavigator();

export default function Pick(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Orders">
                {(screenProps) => <OrderList {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <PickList {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}