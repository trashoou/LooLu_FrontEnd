import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Header.module.css";

import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/logo.png";
import AVATAR from "../../images/avatar.jpg";
import { logoutUser, toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const { currentUser, cart } = useSelector(({ user }) => user);

  const [values, setValues] = useState({ username: "Guest", avatarPath: AVATAR });

  const { data, isLoading } = useGetProductsQuery({
    params: { title: searchValue },
  });

  useEffect(() => {
    if (!currentUser) return;
    setValues(currentUser);
  }, [currentUser]);

  const handleSearch = ({ target: { value } }) => {
    setSearchValue(value);
  };

  

  const handleMenuClick = (route) => {
    navigate(route);
    setIsDropdownOpen(false); // Закрыть меню после навигации
  };

  const handleClick = () => {
    if (!currentUser) {
      dispatch(toggleForm(true));
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setValues({ username: "Guest", avatarPath: AVATAR });
  };

  return (
    <div className={styles.Header} >
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="LooLu" />
        </Link>
      </div>

      <div className={styles.info} >
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${values.avatarPath})` }}
          />
          <div className={styles.username}>{values.username}</div>
          <div className={`${styles.userdropdown} ${isDropdownOpen ? styles.show : ""}`} >
            {isDropdownOpen && (
              <div className={styles.dropdowncontent}>
                <p onClick={() => handleMenuClick(ROUTES.PROFILE)}>User Data</p>
                <p onClick={() => handleMenuClick(ROUTES.ORDERS)}>Orders</p>
                <p onClick={() => handleMenuClick(ROUTES.SETTINGS)}>Settings</p>
                <p onClick={handleLogout}>Sign Out</p>
              </div>
            )}
          </div>
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
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading..."
                : !data.length
                ? "No results"
                : data.map(({ title, picture, id }) => {
                    return (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${picture})` }}
                        />

                        <div className={styles.title}>{title}</div>
                      </Link>
                    );
                  })}
            </div>
          )}
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
            {!!cart.length && <span className={styles.count}>{cart.length}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
