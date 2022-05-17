import config from "../config/config.json";
import OrderItem from "../interfaces/order_item";
import Order from "./../interfaces/order";

const orders = {
    getOrders: async function getOrders(): Promise<Order> {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    pickOrder: async function pickOrder(order: Partial<Order>) {
        order.order_items.map(async (order_item: Partial<OrderItem>) => {
            const updatedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key
            };
        });

        const updatedOrder = {
            id: order.id,
            name: order.name,
            status_id: 200,
            api_key: config.api_key
        }

        await orders.updateOrder(updatedOrder);
    },

    updateOrder: async function updateOrder(order: Partial<Order>) {
        try{
            await fetch(`${config.base_url}/orders`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type':'application/json'
                },
                method: 'PUT'
            });
        } catch(error) {
            console.log(error);
        }
    }
};

export default orders;