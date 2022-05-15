import { useState, useEffect } from 'react';
import { ScrollView, Text, Button, Pressable, Platform, View } from "react-native";
import { Base, Typography, Forms } from '../styles';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import orderModel from "../models/orders";
import invoiceModel from "../models/invoice";
import Order from '../interfaces/order';
import Invoice from '../interfaces/invoice';
import config from './../config/config.json';

export default function InvoicesForm({ navigation }) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});
    const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

    async function addInvoice() {
        const defaultDate = new Date()
        if (typeof invoice.due_date == 'undefined') {
            invoice.due_date = defaultDate.toLocaleDateString('se-SV');
        }
        invoice.creation_date = defaultDate.toLocaleDateString('se-SV');
        let totalPrice = 0;
        currentOrder.order_items.forEach(order_item => {
            totalPrice += order_item.amount * order_item.price
        });
        invoice.total_price = totalPrice;
        await invoiceModel.addInvoice(invoice);
    
        const updatedOrder = {
            ...currentOrder,
            status_id: 600,
            api_key: config.api_key
        };
    
        await orderModel.updateOrder(updatedOrder);
    
        navigation.navigate("Fakturor", { reload: true });
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>Ny faktura</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                setCurrentOrder={setCurrentOrder}
            />

            <Text style={{ ...Typography.label }}>Deadline</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Pressable
                style={Forms.button}
                onPress={() => {
                    addInvoice();
                }}
            >
                <Text style={Forms.buttonText}>Skapa faktura</Text>
            </Pressable>
        </ScrollView>
    );
};

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);
    let ordersHash: any = {};

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const itemsList = orders.map((ord, index) => {
        ordersHash[ord.id] = ord;
        if (ord.status_id < 600) {
            return <Picker.Item key={index} label={ord.name + ' | ' + ord.id.toString()} value={ord.id} />;
        }
        return
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
                props.setCurrentOrder(ordersHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
}

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setInvoice({
                            ...props.invoice,
                            due_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}