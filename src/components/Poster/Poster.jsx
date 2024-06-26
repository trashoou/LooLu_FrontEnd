import React from 'react';

import styles from "../../styles/Home.module.css";

import BG from "../../images/iphone.png";

import { Link } from 'react-router-dom';

const Poster = () => (
    <section className={styles.home}>
        <div className={styles.title}>BIG SALE 20%</div>
        <div className={styles.product}>
            <div className={styles.text}>
                <div className={styles.subtitle}>the bestseller of 2024</div>
                <h1 className={styles.head}>IPhone 15 Pro Max</h1>
                <Link to="/products/71"><button className={styles.button}>Shop now</button></Link>
            </div>
            <div className={styles.image}>
                <img src={BG} alt="" />
            </div>
        </div>
    </section>
)

export default Poster;
