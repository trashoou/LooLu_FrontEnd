import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../features/user/userSlice";

import styles from "../../styles/Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(({ user }) => user);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (!currentUser) return;

    setValues(currentUser);
  }, [currentUser]);

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверка на заполнение всех обязательных полей
    if (!values.firstName || !values.lastName || !values.email || !values.password || !values.username) {
      alert("Please fill in all required fields.");
      return;
    }

    dispatch(updateUser(values));
  };

  return (
    <section className={styles.profile}>
      {!currentUser ? (
        <span>You need to log in</span>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.group}>
          <input
            type="firstName"
            placeholder="Your firstName"
            name="firstName"
            value={values.firstName}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="lastName"
            placeholder="Your lastName"
            name="lastName"
            value={values.lastName}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="password"
            placeholder="Your password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="username"
            placeholder="Your username"
            name="username"
            value={values.username}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

          <button type="submit" className={styles.submit}>
            Update
          </button>
        </form>
      )}
    </section>
  );
};

export default Profile;