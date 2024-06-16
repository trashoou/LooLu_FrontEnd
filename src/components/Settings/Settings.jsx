// Settings.jsx

import React, { useState } from "react";
import styles from "../../styles/Settings.module.css";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("setting1"); // Используем состояние для отслеживания активной вкладки

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className={styles.settings}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === "setting1" && styles.active}`}
          onClick={() => handleTabClick("setting1")}
        >
          Setting 1
        </div>
        <div
          className={`${styles.tab} ${activeTab === "setting2" && styles.active}`}
          onClick={() => handleTabClick("setting2")}
        >
          Setting 2
        </div>
        <div
          className={`${styles.tab} ${activeTab === "setting3" && styles.active}`}
          onClick={() => handleTabClick("setting3")}
        >
          Setting 3
        </div>
        <div
          className={`${styles.tab} ${activeTab === "setting4" && styles.active}`}
          onClick={() => handleTabClick("setting4")}
        >
          Setting 4
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "setting1" && <div>Content for Setting 1</div>}
        {activeTab === "setting2" && <div>Content for Setting 2</div>}
        {activeTab === "setting3" && <div>Content for Setting 3</div>}
        {activeTab === "setting4" && <div>Content for Setting 4</div>}
      </div>
    </section>
  );
};

export default Settings;
