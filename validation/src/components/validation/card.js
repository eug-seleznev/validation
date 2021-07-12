import axios from "axios";
import { useEffect, useRef, useState } from "react"
import WinAnimation from "./Animation";
import styles from '../../styles/winner.module.sass'
import InputMask from 'react-input-mask';
import ErrorScreen from "../errorScreen/error";
import Textfit from 'react-textfit'
import NdflWinner from "../finishScreens/ndflWinner";

const ip = process.env.REACT_APP_IP;

const CardPage = ({win,code, totalSum, counter}) => {

    const [finish, setFinish] = useState(false)
    const [error, setError] = useState(false)
    const [card, setCard] = useState('')
    const [phone, setPhone] = useState('')


    const sendOnCard = () => {
        const cardNumber = card.replace(/ /g,'')
        EnterCard(code,cardNumber).then((res) => {
            if(res){
                setFinish(true)
            } else {
              setError(true)
            }
          })
    }
    const sendOnPhone = () => {
        const phoneNumber = phone.replace(/\D/g,'').substring(1)
        EnterPhone(code,phoneNumber).then((res) => {
            if(res){
                setFinish(true)
            } else {
              setError(true)
            }
          })
    }
    const closeTab = () => {
      window.open("about:blank", "_self");
      window.close();
    }


    return (
      <div className={styles.cardPage}>
        {win<=20 && ( error? 
          <ErrorScreen 
              title='ЧТО-ТО ПОШЛО НЕ ТАК'
              subtitle='Проверьте правильность заполнения и попробуйте еще раз'
              button='ВЕРНУТЬСЯ'
              onClick={()=>setError(false)}
          /> :
        totalSum? <NdflWinner closeTab={closeTab} counter={counter}  /> :
        
        !finish? <>
          <Textfit mode="single" className={styles.title} max={50}>
            МОИ ДАННЫЕ
          </Textfit>
          <p>Укажите номер телефона, на который нужно отправить выигрыш</p>
          <div className={styles.phoneDiv}>
            <InputMask mask="+7 (999)-999-99-99" alwaysShowMask={false} value={phone} onChange={(e)=>setPhone(e.target.value)}>
              {(inputProps) => 
                <input {...inputProps} 
                  disableUnderline 
                  className={styles.phoneInput}
                  inputmode="numeric"
                  name="phone"
                  placeholder='Телефон'
                  autoCapitalize='none'
                  autoComplete='none'
                />}
            </InputMask>
          </div>
          <button onClick={sendOnPhone}>ОТПРАВИТЬ</button>
        </> :
        <>
          <Textfit mode="single" className={styles.title} max={50}>
            МОИ ДАННЫЕ
          </Textfit>
          <p>В ближайшее время деньги будут отправлены на указанный телефон, спасибо за участие!</p>
          <button onClick={closeTab}>ЗАКРЫТЬ</button>
        </>)}

        {win>20 && win<=4000 && (error? 
          <ErrorScreen 
              title='ЧТО-ТО ПОШЛО НЕ ТАК'
              subtitle='Проверьте правильность заполнения и попробуйте еще раз'
              button='ВЕРНУТЬСЯ'
              onClick={()=>setError(false)}
          /> :
          totalSum? <NdflWinner closeTab={closeTab} counter={counter}  /> :

        !finish? <>
          <Textfit mode="single" className={styles.title} max={50}>
            МОИ ДАННЫЕ
          </Textfit>
          <p>Укажите номер в поле карты, на которую нужно отправить выигрыш</p>
            <InputMask mask="9999 9999 9999 9999" alwaysShowMask={false} value={card} onChange={(e)=>setCard(e.target.value)}>
              {(inputProps) => 
                <input 
                  {...inputProps} 
                  disableUnderline 
                  type='text'
                  inputmode="numeric"
                  name="card"
                  placeholder='0000 0000 0000 0000'
                  autoCapitalize='none'
                  autoComplete='none'
                />}
            </InputMask>
          <button onClick={sendOnCard}>ОТПРАВИТЬ</button>
        </>:
        <>
          <Textfit mode="single" className={styles.title} max={50}>
            МОИ ДАННЫЕ
          </Textfit>
          <p>В ближайшее время деньги будут отправлены на указанную карту, спасибо за участие!</p>
          <button onClick={closeTab}>ЗАКРЫТЬ</button>
        </>)}

        {win>4000 && <NdflWinner closeTab={closeTab} counter={counter} />}
      </div>
    );
}



export default CardPage







//reg new user
const EnterCard = async (code,card) => {
  try {
    const formData = {
        code: code,
        card: card,
    }
    const res = await axios.put(ip + `pay/card`, formData);
    return true;

  } catch (err) {
    alert(err.response.data.err)
    return false;
  }
};

const EnterPhone = async (code,phone) => {
    try {
      const formData = {
          code: code,
          phone: phone,
      }
      const res = await axios.put(ip + `pay/phone`, formData);
      return true;

    } catch (err) {
    alert(err.response.data.err)

      return false;
    }
  };