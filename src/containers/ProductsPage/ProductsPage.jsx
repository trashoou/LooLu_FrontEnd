import { useState, useEffect } from 'react';
import { getApiResource } from '../../utils/network';
import { API_PRODUCTS } from '../../constants/api'
import { getProductsId } from '../../services/getProductsData';
import ProductsList from '../../components/ProductsPage/ProductsList';

import styles from './ProductsPage.module.css';

const ProductsPage = () => {
    const [products, setProducts] = useState(null);

    // const arr = useState(null);
    // const people = arr[0];
    // const setPeople = arr[1];

    const getResourse = async (picture) => {
        const res = await getApiResource(picture);
        
        if (res && Array.isArray(res)) {
            const productsList = res.map(({ title, picture }) => {

                const id = getProductsId(picture);
                console.log(id);

                return {
                    title,
                    picture
                }
            })
            console.log(productsList);
            setProducts(productsList);
        } else {
            console.error('Response is undefined or not an array:', res);
        }
        
        
    }

    useEffect(() => {
        getResourse(API_PRODUCTS);
    }, []);

    return (
        <>
            {products && <ProductsList products={products} />}
        </>
    )
}

export default ProductsPage;