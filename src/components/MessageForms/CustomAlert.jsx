import React from 'react';
import PropTypes from 'prop-types';
import styles from "../../styles/CustomAlert.module.css";



const CustomAlert = ({ message, onClose }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.alertBox}>
                <p className={styles.alertText}>{message}</p><br></br><br></br>
                <button className={styles.btn} onClick={onClose}>Ok</button>
            </div>
        </div>
    );
};

CustomAlert.propTypes = {
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CustomAlert;