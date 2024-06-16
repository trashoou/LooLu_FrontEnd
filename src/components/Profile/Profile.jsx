import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";

import axios from "axios";
import { BASE_URL } from "../../utils/constants";

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
    avatarPath: "",
  });

  const handleFileUpload = async (files) => {
    if (files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/upload/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Обновляем состояние values с новым avatarPath, если требуется
      const updatedValues = { ...values, avatarPath: response.data };
      setValues(updatedValues);
      dispatch(updateUser(updatedValues)); // Опционально, если требуется обновить пользователя на сервере
    } catch (error) {
      console.error("Error uploading file:", error);
      // Обработка ошибок загрузки
    }
  };

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
    if (
      !values.firstName ||
      !values.lastName ||
      !values.email ||
      !values.password ||
      !values.username
    ) {
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
        <>
          <form className={styles.form} onSubmit={handleSubmit}> <div style={{ textAlign: "center" }}><h2>User Data</h2></div>
            <div className={styles.group}>
              <input
                type="text"
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
                type="text"
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
                type="text"
                placeholder="Your username"
                name="username"
                value={values.username}
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

          
            <div className={styles.center}>
              <label htmlFor="avatarUpload" className={`${styles.uploadLabel} ${styles.title}`}>
                Upload Avatar
              </label>
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                style={{ display: "none" }}
              />
            </div>

            <button type="submit" className={styles.submit}>
              Update
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default Profile;
