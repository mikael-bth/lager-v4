import config from "../config/config.json";
import Invoice from "./../interfaces/invoice";
import storage from "./storage";

const invoices = {
    getInvoices: async function getInvoices(): Promise<Invoice> {
        const token = await storage.readToken();

        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': [token.token]
            },
            method: 'GET'
        })
        const result = await response.json();

        return result.data;
    },

    addInvoice: async function addInvoice(invoice: Partial<Invoice>) {
        const token = await storage.readToken();
        console.log(invoice);

        const newInvoice = {
            order_id: invoice.order_id,
            total_price: invoice.total_price,
            creation_date: invoice.creation_date,
            due_date: invoice.due_date,
            api_key: config.api_key
        }

        try{
            await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(newInvoice),
                headers: {
                    'content-type':'application/json',
                    'x-access-token': [token.token]
                },
                method: 'POST'
            });
        } catch(error) {
            console.log(error);
        }
    },
};

export default invoices;