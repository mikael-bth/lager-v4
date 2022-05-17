import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import productModel from "../models/products.ts";
import { Typography } from './../styles';

function StockList({products, setProducts}) {
  useEffect(async () => {
    await reloadProducts();
  }, []);

  async function reloadProducts() {
    const products = await productModel.getProducts();
    setProducts(products);
  }
  
  const list = products.map((product, index) => {
    return <Text
            key={index}
            style={{ ...Typography.normal }}
            >
              { product.name } - { product.stock }
            </Text>
  });

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={[Typography.header2, {color: '#333'}]}>Lagerförteckning</Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
}