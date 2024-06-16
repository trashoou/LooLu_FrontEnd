import React, { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("Products"); // Используем состояние для отслеживания активной вкладки

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <section className={styles.panel}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${
            activeTab === "Products" && styles.active
          }`}
          onClick={() => handleTabClick("Products")}
        >
          Manage Products
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "UsersControll" && styles.active
          }`}
          onClick={() => handleTabClick("UsersControll")}
        >
          Manage Users
        </div>
        <div
          className={`${styles.tab} ${
            activeTab === "CategoryControll" && styles.active
          }`}
          onClick={() => handleTabClick("CategoryControll")}
        >
          Manage Categories
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "Products" && <div>Content for Products</div>}
        {activeTab === "UsersControll" && <div>Content for Users</div>}
        {activeTab === "CategoryControll" && <div>Content for Categories</div>}
      </div>
    </section>
  );
};

export default Admin;
