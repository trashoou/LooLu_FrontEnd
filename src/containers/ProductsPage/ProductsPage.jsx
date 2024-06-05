import { useState, useEffect } from 'react';
import { getApiResource } from '../../utils/network';
import { API_PRODUCTS } from '../../constants/api'

import styles from './ProductsPage.module.css';

const ProductsPage = () => {
    const [products, setProducts] = useState(null);

    // const arr = useState(null);
    // const people = arr[0];
    // const setPeople = arr[1];

    const getResourse = async (url) => {
        const res = await getApiResource(url);
        
        if (res && Array.isArray(res)) {
            const productsList = res.map(({ title, url }) => {
                return {
                    title,
                    url
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
            {products && (
                <ul>
                    {products.map(({ title, url }) => 
                        <li key={title}>{title}</li>
                    )}
                </ul>
            )}
            
        </>
    )
}

export default ProductsPage;
