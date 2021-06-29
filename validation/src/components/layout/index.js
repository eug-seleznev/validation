
import styles from '../../styles/layout.module.sass'
import { NavLink } from "react-router-dom";

const Layout = () => {
  
    return (
    
    <div className={styles.layout}>
        <a href='https://millionpuzzle.ru/privacy-policy' >правила</a>
        <address>info@moneypuzzle.ru</address>
    </div>
    );
}



export default Layout


