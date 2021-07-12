import React from 'react'
import styles from '../../styles/errors.module.sass'
import Textfit from 'react-textfit'
import {NavLink} from 'react-router-dom'
const ErrorScreen = ({title, subtitle, button, onClick}) => {

    return(
        <div className={styles.notFound}>
            <div>
              <h3>404</h3>
              <p>Страницы нет</p>
            </div>
            <a href='https://millionpuzzle.ru/'>ПЕРЕЙТИ НА САЙТ</a>
        </div>
    )
}
export default ErrorScreen