import { render } from '@testing-library/react-native';
import ShipList from '../components/ShipList';

const order = [
    { name: "Mikael", status: "Packad" },
    { name: "Tobias", status: "Ny" },
    { name: "Erik", status: "Packad" },
];

const setOrders = () => false;

const route = {
    params: false
}

test('List should contain two orders', async () => {
    const { getByText } = render(<ShipList route={route} allOrders={order} setAllOrders={setOrders} />);

    const mikael = await getByText('Mikael', { exact: false });
    const erik = await getByText('Erik', { exact: false });

    expect(mikael).toBeDefined();
    expect(erik).toBeDefined();

    let tobias;
    try {
        tobias = await getByText('Tobias', { exact: false });
    } catch(error) {
        expect(tobias).toBeUndefined();
    }
    
});