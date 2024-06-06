import PropTypes from 'prop-types'; // ES6
import styles from './ProductsList.module.css';

const ProductsList = ({ products }) => {
    return (
        <ul className={styles.list__container}>
            {products.map(({ title, picture }) => 
                <li className={styles.list__item} key={title}>
                    <a href="#">
                        <img className={styles.product__photo} src={picture} alt={title}/>
                        <p>{title}</p>
                    </a>
                </li>
            )}
        </ul>
    )
}

ProductsList.propTypes = {
    products: PropTypes.array
}

export default ProductsList;