import config from "../config/config.json";
import Product from "./../interfaces/product";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${config.base_url}/products?api_key=${config.api_key}`);
        const result = await response.json();
        return result.data;
    },

    updateProduct: async function updateProduct(product: Partial<Product>) {
        console.log(product);
        try{
            await fetch(`${config.base_url}/products`, {
                body: JSON.stringify(product),
                headers: {
                    'content-type':'application/json'
                },
                method: 'PUT'
            });
        } catch(error) {
            console.log(error);
        }

    },
};

export default products;