import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoicesList from './InvoicesList';
import InvoicesForm from './InvoicesForm';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="Fakturor" component={InvoicesList} />
            <Stack.Screen name="Ny faktura">
                {(screenProps) => <InvoicesForm {...screenProps} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};