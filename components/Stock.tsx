import { Text, View } from 'react-native';
import { Typography } from './../styles';
import StockList from './StockList';

export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={[Typography.header2, {color: '#333'}]}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
}