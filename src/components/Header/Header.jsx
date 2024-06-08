import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../styles/Header.module.css';

import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.png";
import AVATAR from "../../images/avatar.jpg";

const Header = () => {
    return (
        <div className={styles.Header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt="LooLu" />
                </Link>
            </div>

            <div className={styles.info}>
                <div className={styles.user}>
                    <div 
                        className={styles.avatar} 
                        style={{ backgroundImage: `url(${AVATAR})`}}
                    />
                            <div className={styles.username}>Guest</div>
                </div>

                <form className={styles.form}>
                    <div className={styles.icon}>
                        <svg className="icon">
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
                        </svg>
                    </div>
                    <div className={styles.input}>
                        <input 
                            type="search" 
                            name="search" 
                            placeholder="Search for any product" 
                            autoComplete="off"
                            onChange={() => {}}
                            value=""
                        />
                    </div>

                    {false && <div className={styles.box}></div>}
                </form>

                <div className={styles.account}>
                    <Link to={ROUTES.HOME} className={styles.favourites}>
                        <svg className={styles["icon-fav"]}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
                        </svg>
                    </Link>

                    <Link to={ROUTES.CART} className={styles.cart}>
                        <svg className={styles["icon-cart"]}>
                            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
                        </svg>
                        <span className={styles.count}>2</span>
                    </Link>
                </div>
            </div>
        </div>
    )
};

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
