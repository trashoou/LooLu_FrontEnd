import styles from './ErrorMessage.module.css';

const ErrorMessage = () => {
    return (
        <>
            <p className={styles.text}>
                We cannot display data. <br />
                Come back when we fix everything
            </p>
        </>
    )
}

export default ErrorMessage;