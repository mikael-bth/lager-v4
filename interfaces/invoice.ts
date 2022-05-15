interface Invoice {
    id: number,
    order_id: number,
    name: string,
    total_price: number,
    creation_date: string,
    due_date: string,
}

export default Invoice;