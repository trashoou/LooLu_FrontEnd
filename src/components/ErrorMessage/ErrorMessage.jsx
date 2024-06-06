import styles from './ErrorMessage.module.css';
import icon from '../image/Loolu_big.webp';
import LoadSpinner from '../LoadSpinner/LoadSpinner';

const ErrorMessage = () => {
    return (
        <>
            <p className={styles.text}>
                We cannot display data. <br />
                Come back when we fix everything
                {/*<LoadSpinner />*/}
                <img className={styles.loolu_icon} src={icon} alt="" />
            </p>
        </>
    )
}

export default ErrorMessage;