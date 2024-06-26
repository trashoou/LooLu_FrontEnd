import React from 'react';
import ReactDOM from 'react-dom';
import CustomAlert from '../MessageForms/CustomAlert';

const alertContainer = document.createElement('div');
document.body.appendChild(alertContainer);

const showAlert = (message) => {
    const handleAlertClose = () => {
        ReactDOM.render(null, alertContainer); // Удаление компонента из DOM
    };

    ReactDOM.render(
           <CustomAlert message={message} onClose={handleAlertClose} />,
        alertContainer
    );
};

export default showAlert;