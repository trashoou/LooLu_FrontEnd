//Импорты
//NavLink: Импортируется из react-router-dom для создания навигационных ссылок, 
//которые позволяют переключаться между различными страницами/маршрутами приложения.
//styles: Импортируются стили из CSS-модуля Header.module.css, что позволяет использовать CSS-классы, 
//определенные в этом файле, внутри компонента.
import { NavLink } from 'react-router-dom'

import styles from './Header.module.css';

const Header = () => { //Определяем функциональный компонент Header.
    return (
        // Основной контейнер для навигационного меню, стилизованный с помощью CSS-модуля.
        <div className={styles.container}>
             {/* Список ul для навигационных ссылок. */}
                <ul className={styles.list__container}>
                    {/* Элемент списка с навигационной ссылкой на домашнюю страницу. */}
                    <li><NavLink to="/" exact >Home</NavLink></li>
                    {/* Элемент списка с навигационной ссылкой на страницу продуктов. */}
                    <li><NavLink to="/products" exact >Products</NavLink></li>
                </ul>
        </div>
    )
}

// Экспортируем компонент для использования в других частях приложения.
export default Header;
