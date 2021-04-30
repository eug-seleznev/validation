import React from 'react'
import styles from '../../styles/errors.module.sass'
import Textfit from 'react-textfit'
const ErrorScreen = ({title, subtitle, button, onClick}) => {

    return(
        <div className={styles.incorrect}>
                <Textfit mode="single" className={styles.title}>
                    {title}
                </Textfit>
                <h3></h3>
                <p>{subtitle}</p>
                <button onClick={onClick} >{button}</button>
              </div>
    )
}
export default ErrorScreen