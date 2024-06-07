import styles from './ErrorMessage.module.css';
import icon from '../image/Loolu_big.webp';
//import LoadSpinner from '../LoadSpinner/LoadSpinner';

// Определение функционального компонента ErrorMessage.
const ErrorMessage = () => {
    return (
        // React Fragment, используемый для группировки дочерних элементов.
        <>
        {/* Текст сообщения об ошибке с применением стилей из CSS-модуля. */}
            <p className={styles.text}>
                We cannot display data. <br />
                Come back when we fix everything
                {/*<LoadSpinner />*/}
                {/* Изображение с иконкой, стилизованное с помощью CSS-модуля. */}
                <img className={styles.loolu_icon} src={icon} alt="" />
            </p>
        </>
    )
}

// Экспортируем компонент для использования в других частях приложения.
export default ErrorMessage;