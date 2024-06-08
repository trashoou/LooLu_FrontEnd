import { NavLink } from 'react-router-dom'

import styles from '../../styles/Header.module.css';

import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.png";
import AVATAR from "../../images/avatar.jpg";

const Header = () => {
    return (
        <div className={styles.container}>
                <ul className={styles.list__container}>
                    <li><NavLink to="/" exact >Home</NavLink></li>
                    <li><NavLink to="/products" exact >Products</NavLink></li>
                </ul>
        </div>
    )
};

// Экспортируем компонент для использования в других частях приложения.
export default Header;




// import { NavLink } from 'react-router-dom'

// import styles from './Header.module.css';


// const Header = () => {
//     return (
//         <Header>
//             <div className={styles.container}>
//                 <ul className={styles.list__container}>
//                     <li><NavLink to="/" exact="true">Home</NavLink></li>
//                     <li><NavLink to="/products" exact="true">Products</NavLink></li>
//                 </ul>
//             </div>
//         </Header>

//     )
// }

// export default Header;
