import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updateCartItem,
  deleteItemFromCart,
  selectCartItems,
  fetchCartItemsByCartId
} from "../../features/cart/cartSlice";

import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import {
  useGetProductsIdByCartQuery,
} from "../../features/api/apiSlice";

import { getProductById } from "../../features/products/productsSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(({ user }) => user);

  const cartItems = useSelector(selectCartItems);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    if (currentUser && currentUser.cartId) {
      setCartId(currentUser.cartId);
      dispatch(fetchCartItemsByCartId(currentUser.cartId)); // Подгрузка данных корзины
    }
  }, [currentUser, dispatch]);

  const { data: cartIdsData, error: cartIdsError } = useGetProductsIdByCartQuery(cartId);

  useEffect(() => {
    if (cartIdsData) {
      const productIds = cartIdsData.map((item) => item.productId);
      const fetchProducts = async () => {
        try {
          const productPromises = productIds.map((productId) =>
            dispatch(getProductById(productId))
          );
          const productsData = await Promise.all(productPromises);
          setProducts(productsData.map((item) => item.payload));
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
    }
  }, [cartIdsData, dispatch]);

  const changeQuantity = (item, quantity) => {
    const cartItemToUpdate = cartIdsData.find(
      (cartItem) => cartItem.productId === item.id
    );
    if (cartItemToUpdate) {
      dispatch(
        updateCartItem({
          cartId: cartId,
          itemId: cartItemToUpdate.id,
          updateCartItem: { quantity },
        })
      );
    } else {
      console.log(`CartItem with productId ${item.productId} not found in cartIdsData.`);
    }
  };

  const removeItem = (productId) => {
    const cartItemToRemove = cartIdsData.find(
      (cartItem) => cartItem.productId === productId
    );
    if (cartItemToRemove) {
      dispatch(deleteItemFromCart({ cartId, itemId: cartItemToRemove.id }));
    } else {
      console.log(`CartItem with productId ${productId} not found in cartIdsData.`);
    }
  };

  const handleCheckout = () => {
    setIsPaymentSuccess(true);
  };

  const combinedProducts = products.map((product) => {
    const cartItem = cartItems.find((item) => item.productId === product.id);
    return {
      ...product,
      quantity: cartItem ? cartItem.quantity : 0,
    };
  }).filter((item) => item.quantity > 0);

  const isAuthenticated = !!currentUser;
  
  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>

      {!isAuthenticated ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          {!combinedProducts.length && !cartIdsError ? (
            <div className={styles.empty}>Here is empty</div>
          ) : (
            <>
              <div className={styles.list}>
                {combinedProducts.map((item) => {
                  const { title, categoryName, imageUrls, price, id, quantity } =
                    item;

                  return (
                    <div className={styles.item} key={id}>
                      <div
                        className={styles.image}
                        style={{ backgroundImage: `url(${imageUrls[0]})` }}
                      />
                      <div className={styles.info}>
                        <h3 className={styles.name}>{title}</h3>
                        <div className={styles.category}>{categoryName}</div>
                      </div>

                      <div className={styles.price}>{price}$</div>

                      <div className={styles.quantity}>
                        <div
                          className={styles.minus}
                          onClick={() =>
                            changeQuantity(item, Math.max(1, quantity - 1))
                          }
                        >
                          <svg className="icon">
                            <use
                              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                            />
                          </svg>
                        </div>

                        <span>{quantity}</span>

                        <div
                          className={styles.plus}
                          onClick={() =>
                            changeQuantity(item, Math.max(1, quantity + 1))
                          }
                        >
                          <svg className="icon">
                            <use
                              xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                            />
                          </svg>
                        </div>
                      </div>

                      <div className={styles.total}>{(price * quantity).toFixed(2)}$</div>

                      <div
                        className={styles.close}
                        onClick={() => removeItem(item.id)}
                      >
                        <svg className="icon">
                          <use
                            xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.actions}>
                <div className={styles.total}>
                  TOTAL PRICE:{" "}
                  <span>
                    {sumBy(
                      combinedProducts,
                      (item) => item.quantity * item.price
                    ).toFixed(2)}
                    $
                  </span>
                </div>

                {!isPaymentSuccess ? (
                  <button className={styles.proceed} onClick={handleCheckout}>
                    Proceed to checkout
                  </button>
                ) : (
                  <div className={styles.successMessage}>
                    Payment successful! Your order has been placed.
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Cart;
