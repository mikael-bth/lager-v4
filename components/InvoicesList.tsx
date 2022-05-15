import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import { DataTable } from "react-native-paper";
import invoiceModel from "./../models/invoice";
import { Base, Typography, Invoices } from './../styles';

export default function InvoicesList({ route, navigation }) {
    let { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
        reload = false;
    }

    async function reloadInvoices() {
        const invoices = await invoiceModel.getInvoices();
        setAllInvoices(invoices);
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    const listOfInvoices = allInvoices
        .map((invoice, index) => {
            return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.order_id}</DataTable.Cell>
                <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
            </DataTable.Row>
            );
        });
        
    
    if (listOfInvoices.length == 0) {
        return (
            <View style={[Base.base, {alignItems: "center"}]}>
                <Text style={Typography.header3}>Inga fakturor</Text>
                <Button
                    title="Skapa ny faktura"
                    onPress={() => {
                        navigation.navigate('Ny faktura');
                    }}
                />
            </View>
        );
    }

    return (
        <View style={[Invoices.container, {alignItems: "center"}]}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Deadline</DataTable.Title>
                    <DataTable.Title numeric>ID</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                </DataTable.Header>
                {listOfInvoices}
            </DataTable>
            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Ny faktura');
                }}
            />
        </View>
    );
}