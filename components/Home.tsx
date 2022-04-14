import { Image, Text, ScrollView } from 'react-native';
import warehouse from './../assets/warehouse.jpg';
import Stock from './Stock';
import { Base, Typography } from './../styles';

export default function Home({products, setProducts}) {
  return (
      <ScrollView style={Base.base}>
        <Text style={[Typography.header1, {color: '#33c'}]}>Lager-Appen</Text>
        <Image source={warehouse} style={Base.logo} />
        <Stock products={products} setProducts={setProducts} />
      </ScrollView>
  );
}

