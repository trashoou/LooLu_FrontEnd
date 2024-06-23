import React, { useEffect, useState } from "react";
import styles from "@styles/Product.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch } from "react-redux";
import { addItemToCart, addItemToFavorites } from "../../features/user/userSlice";

const SIZES = [4, 4.5, 5];

const Product = (item) => {
    const { title, price, imageUrls, description } = item;
    const dispatch = useDispatch();

    // Если imageUrls это строка, создайте массив с одним элементом
    
        const [currentImage, setCurrentImage] = useState();
        const [currentSize, setCurrentSize] = useState();

        useEffect(() => {
            if(!imageUrls.length) return;

            setCurrentImage(imageUrls[0]);
        }, [imageUrls]);

        const addToCart = () => {
            dispatch(addItemToCart(item))
        }

        const addToFavorites = () => {
            dispatch(addItemToFavorites(item))
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
                <div className={styles.color}>
                    <span>Color:</span> Green
                </div>
                <div className={styles.sizes}>
                    <span>Sizes:</span>
                    <div className={styles.list}>
                        {SIZES.map(size => (
                            <div 
                                onClick={() => setCurrentSize(size)} 
                                className={`${styles.size} ${currentSize === size ? styles.active : ""}`}   
                                key={size}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.actions}>
                    <button onClick={addToCart} className={styles.add} disabled={!currentSize}>Add to cart</button>
                    <button onClick={addToFavorites} className={styles.favourite}>Add to favourites</button>
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