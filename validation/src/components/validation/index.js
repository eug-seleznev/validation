import { useEffect, useState } from "react";
import ValidationForm from "./Validation";
import axios from 'axios'
import styles from '../../styles/validation.module.sass'
import {main} from '../../styles/colors'
import { NavLink } from "react-router-dom";
import WinAnimation from "./Animation";
import WinnerPage from "./Winner";
import CardPage from "./card";
//1 . validate link from qr, and render form on success
const ip = process.env.REACT_APP_IP;

const Validation = ({match}) => {
    const {link} = match.params;
    const [loaded, setLoaded] = useState('')
    const [code, setCode] = useState('')
    const [win, setWin] = useState('')
    
    useEffect(() => 
    {
        ValidateLink(link).then(res => {
          if(res.status == 200){
            setLoaded('start')
            if(res.data.status==302){
              setLoaded('validated')
              setCode(res.data.code)
              setWin(res.data.value)
            } else if (res.data.phone){
              setLoaded('payment')
              setCode(res.data.code)
              setWin(res.data.value)
            }
            
          } else if (res.status == 400){
            setLoaded('payed')
          } else if (res.status == 402) {
            setLoaded('404')
          } 
        })
    },
    
    [link]);
    
    return (
    
    <div className={styles.container} >
        {loaded=='start' ? (
          <ValidationForm link={link} />
        ) :
        loaded=='validated' ? (
          <WinnerPage  win={win} code={code}  />
        ) :
        loaded=='payment' ? (
          <CardPage  win={win} code={code}  />
        ) :
        loaded=='payed' ? (
          <div className={styles.notFound}>
            <div>
              <h3>400</h3>
              <p>Этот код уже оплачен</p>
            </div>
            <NavLink to='/site'>ПЕРЕЙТИ НА САЙТ</NavLink>
          </div>
        ) :
        loaded=='404' &&
        (
          <div className={styles.notFound}>
            <div>
              <h3>404</h3>
              <p>Страницы нет</p>
            </div>
            <NavLink to='/site'>ПЕРЕЙТИ НА САЙТ</NavLink>
          </div>
        )}
      </div>
    );
}



export default Validation




const ValidateLink = async (link) => {
    try {
        const res = await axios.get(ip + `codes/qr/${link}`);
        
        return res
    } catch (err) {

        return err.response
    
    }
};
