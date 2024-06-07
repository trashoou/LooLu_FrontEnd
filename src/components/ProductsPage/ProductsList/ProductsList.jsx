import PropTypes from 'prop-types'; // ES6
import styles from './ProductsList.module.css';

// Определение функционального компонента ProductsList.
// Используем деструктуризацию для получения пропса `products`.
const ProductsList = ({ products }) => {
    return (
         // Рендерим список ul с классом из стилей.
        <ul className={styles.list__container}>
            {/* Перебираем массив products и рендерим каждый продукт в виде элемента списка li. */}
            {products.map(({ title, picture }) => 
                // Каждому элементу списка задаем уникальный ключ key, используя title.
                <li className={styles.list__item} key={title}>
                    <a href="#">
                        {/* Рендерим изображение продукта с источником picture и альтернативным текстом title. */}
                        <img className={styles.product__photo} src={picture} alt={title}/>
                        {/* Рендерим название продукта. */}
                        <p>{title}</p>
                    </a>
                </li>
            )}
        </ul>
    )
}

// Определение PropTypes для компонента.
// Ожидается, что `products` будет массивом объектов.
ProductsList.propTypes = {
    products: PropTypes.array
}

// Экспортируем компонент для использования в других местах.
export default ProductsList;