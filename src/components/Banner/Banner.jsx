import React from "react";

import styles from "@styles/Home.module.css";

import bannerImg from "../../images/banner.png";

const Banner = (props) => (
    <section className={styles.banner}>
        <div className={styles.left}>
            <p className={styles.content}>
                SUMMER
                <span>SALE</span>
            </p>
            <button className={styles.more}>See more</button>
        </div>

        <div 
        className={styles.right}
        style={{ backgroundImage: `url(${bannerImg})` }}
        >
            <p className={styles.discount}>
                save up to <span>20%</span> off
            </p>

        </div>
    </section>
)

export default Banner;
