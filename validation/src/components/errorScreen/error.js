import React from 'react'
import styles from '../../styles/errors.module.sass'

const ErrorScreen = ({title, subtitle, button, onClick}) => {

    return(
        <div className={styles.incorrect}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <button onClick={onClick} >{button}</button>
              </div>
    )
}
export default ErrorScreen