import React, { useEffect, useState } from "react";
import styles from "@styles/Product.module.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/cart/cartSlice"; // Убедитесь, что у вас есть этот action
import { fetchUserProfile, selectCurrentUser, selectUserLoading, selectUserError } from "../../features/user/userSlice";

const Product = (item) => {
  const { id, title, price, imageUrls, description } = item;
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const isAuthenticated = !!user;

  const [currentImage, setCurrentImage] = useState();

  useEffect(() => {
    if (imageUrls.length > 0) {
      setCurrentImage(imageUrls[0]);
    }
  }, [imageUrls]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, dispatch]);

  const addToCart = () => {
    if (!isAuthenticated) {
      alert("Please log in to add items to your cart.");
      return;
    }

    dispatch(addItemToCart({ cartId: user.cartId, productId: id, quantity: 1 }));
  };

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
              onClick={() => setCurrentImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.price}>{price}$</div>
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
