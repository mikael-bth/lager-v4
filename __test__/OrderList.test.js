import { render } from '@testing-library/react-native';
import OrderList from '../components/OrderList';

const order = [
    { name: "Mikael", status: "Ny" },
    { name: "Tobias", status: "Ny" },
    { name: "Erik", status: "Ny" },
];

const setOrders = () => false;

const route = {
    params: false
}

test('List should contain three orders', async () => {
    const { getByText } = render(<OrderList route={route} allOrders={order} setAllOrders={setOrders} />);

    const mikael = await getByText('Mikael', { exact: false });
    const tobias = await getByText('Tobias', { exact: false });
    const erik = await getByText('Erik', { exact: false });

    expect(mikael).toBeDefined();
    expect(tobias).toBeDefined();
    expect(erik).toBeDefined();
});