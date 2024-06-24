import React, { useEffect, useState } from "react";
import styles from "@styles/Product.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../features/user/userSlice";



const Product = (item) => {
    const { title, price, imageUrls, description } = item;
    const dispatch = useDispatch();

    // Если imageUrls это строка, создайте массив с одним элементом
    
        const [currentImage, setCurrentImage] = useState();
        

        useEffect(() => {
            if(!imageUrls.length) return;

            setCurrentImage(imageUrls[0]);
        }, [imageUrls]);

        const addToCart = () => {
            dispatch(addItemToCart(item))
        }

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div 
                    className={styles.current}
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
                    <div className={styles["images-list"]}>
                {imageUrls.map((image, i) => (
                    <div 
                        key={i}
                        className={styles.image}
                        style={{ backgroundImage: `url(${image})` }}
                        onClick={() => setCurrentImage(imageUrls)}
                    />
                ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}$</div>
                <div className={styles.size}>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.actions}>
                    <button onClick={addToCart} className={styles.add} >Add to cart</button>
                    <button className={styles.favourite}>Add to favourites</button>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.purchase}>19 people purchased</div>
                    <Link to={ROUTES.HOME}>Return to store</Link>
                </div>
            </div>
        </section>
    );
};

export default Product;