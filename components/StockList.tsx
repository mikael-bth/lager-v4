import { useEffect } from 'react';
import productModel from './../models/products';
import { Text, View } from 'react-native';
import { Typography } from './../styles';

export default function StockList({products, setProducts}) {
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