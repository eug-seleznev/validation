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
    const [totalSum, setTotalSum] = useState(false)
    const [pazzleCounter, setPazzleCounter] = useState(0)
    const [errMsg, setErrMsg] = useState('')
    const [dateInvalid, setDateInvalid] = useState(false)
    
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
              setTotalSum(res.data.totalSum)
              setPazzleCounter(res.data.count)
              setLoaded('payment')
              setCode(res.data.code)
              setWin(res.data.value)
            }
            
          } else if (res.status == 400){
            // if()
            setLoaded('payed')
            setErrMsg(res.data.err)
            res.data.dateInvalid && setLoaded('dateInvalid')
          } else if (res.status == 404) {
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
          <CardPage  win={win} code={code} totalSum={totalSum} counter={pazzleCounter} />
        ) :
        loaded=='payed' ? (
          <div className={styles.notFound}>
            <div>
              <h3>400</h3>
              <p>{errMsg}</p>
            </div>
            <a href='https://millionpuzzle.ru/'>ПЕРЕЙТИ НА САЙТ</a>
          </div>
        ) :
        loaded=='404' ?
        (
          <div className={styles.notFound}>
            <div>
              <h3>404</h3>
              <p>Страницы нет</p>
            </div>
            <a href='https://millionpuzzle.ru/'>ПЕРЕЙТИ НА САЙТ</a>
          </div>
        ) :
        loaded=='dateInvalid' && (
          <div className={styles.dateInvalid}>
            <div>
              <h3>400</h3>
              <p>К сожалению, для данного паззла выигрыш больше недоступен. Согласно <a href='https://millionpuzzle.ru/privacy-policy' className={styles.inTextA}>Правилам Акции</a> ввести данные и получить приз можно было только в течение одной недели с момента активации кода.</p>
            </div>
            <a href='https://millionpuzzle.ru/'>ПЕРЕЙТИ НА САЙТ</a>
          </div>
        )
        }
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
