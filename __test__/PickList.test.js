import { render } from '@testing-library/react-native';
import PickList from '../components/PickList';

const order = {
    name: "Mikael",
    address: "Hemma",
    city: "Göteborg",
    zip: "12345",
    order_items: [
        {name: "Skruv", amount: 5, stock: 10, location: "lagret"}
    ]
};

const setProducts = () => false;

const route = {}
route.params = { order };

test('List should contain order and product details', async () => {
    const { getByText } = render(<PickList route={route} setProducts={setProducts} />);

    const namn = await getByText('Mikael', { exact: false });
    const adress = await getByText('Hemma', { exact: false });
    const city = await getByText('12345 Göteborg', { exact: false });
    const product = await getByText('Skruv - 5 - lagret', { exact: false });

    expect(namn).toBeDefined();
    expect(adress).toBeDefined();
    expect(city).toBeDefined();
    expect(product).toBeDefined();
    
});