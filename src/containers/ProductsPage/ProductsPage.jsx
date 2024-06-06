import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // ES6

import { withErrorApi } from '@hoc-helpers/withErrorApi';
import ProductsList from '@components/ProductsPage/ProductsList';
import { getApiResource } from '@utils/network';
import { getProductsId } from '@services/getProductsData';
import { API_PRODUCTS } from '@constants/api'



import styles from './ProductsPage.module.css';

const ProductsPage = ({setErrorApi}) => {
    const [products, setProducts] = useState(null);
    

    const getResourse = async (picture) => {
        const res = await getApiResource(picture);
        
        if (res) {
            const productsList = res.map(({ title, picture }) => {

                const id = getProductsId(picture);
                console.log(id);

                return {
                    title,
                    picture
                }
            })

            setProducts(productsList);
            setErrorApi(false);
        } else {
            setErrorApi(true);
        }
        
        
    }

    useEffect(() => {
        getResourse(API_PRODUCTS);
    }, []);

    return (
        <>
            <h1>Navigation</h1>
            {products && <ProductsList products={products} />}
        </>
    )
}

ProductsPage.propTypes = {
    setErrorApi: PropTypes.func
}

export default withErrorApi(ProductsPage);