import axios from "axios";
import { useEffect, useRef, useState } from "react"
import WinAnimation from "./Animation";
import styles from '../../styles/winner.module.sass'

const ip = process.env.REACT_APP_IP;

const CardPage = ({win,code}) => {

    const [finish, setFinish] = useState(false)
    const [card, setCard] = useState('')
    const [phone, setPhone] = useState('')


    const sendOnCard = () => {
        EnterCard(code,card).then((res) => {
            if(res){
                setFinish(true)
            }
          })
    }
    const sendOnPhone = () => {
        EnterPhone(code,phone).then((res) => {
            if(res){
                setFinish(true)
            }
          })
    }
    const close = () => {
        setFinish(false)
    }
    return (
      <div className={styles.cardPage}>
        {win<=50 && (!finish? <>
        <h1>ГОТОВО</h1>
        <p>Укажите номер телефона, на который нужно отправить выигрыш</p>
        <div className={styles.phoneDiv}>
            <span>+7</span>
            <input
                className={styles.phoneInput}
                // type="phone"
                name="phone"
                placeholder='___-___-__-__'
                // value={formData.phone}
                onChange={(e)=>setPhone(e.target.value)}
                maxLength={10}
                        />
              </div>
        <button onClick={sendOnPhone}>ОТПРАВИТЬ</button>
        </> :
        <>
        <h1>ГОТОВО</h1>
        <p>В ближайшее время деньги будут отправлены на указанный телефон, спасибо за участие!</p>
        
        <button onClick={close}>ЗАКРЫТЬ</button>
        </>)}

        {win>50 && win<=4000 && (!finish? <>
        <h1>ГОТОВО</h1>
        <p>Укажите номер в поле карты, на которую нужно отправить выигрыш</p>
        <input
                // type="email"
                name="card"
                placeholder='0000 0000 0000 0000'
                onChange={(e)=>setCard(e.target.value)}
                maxLength={16}
              />
        <button onClick={sendOnCard}>ОТПРАВИТЬ</button>
        </>:
        <>
        <h1>ГОТОВО</h1>
        <p>В ближайшее время деньги будут отправлены на указанную карту, спасибо за участие!</p>
        
        <button onClick={close}>ЗАКРЫТЬ</button>
        </>)}

        {win>4000 && <>
        <h1>ГОТОВО</h1>
        <p>Мы свяжемся с Вами в будние дни с 10.00 до 19.00 по Московскому времени и сообщим как получить Ваш приз</p>
        
        <button onClick={close}>ЗАКРЫТЬ</button>
        </>}
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
    console.log('1',formData)
    const res = await axios.put(ip + `pay/card`, formData);
    console.log('2',res)
    
    return true;
  } catch (err) {
    console.log('err',err.response)
        alert('Неизвестная ошибка, попробуйте еще раз')
    return false;
  }
};

const EnterPhone = async (code,phone) => {
    try {
      const formData = {
          code: code,
          phone: phone,
      }
    console.log('1',formData)
    const res = await axios.put(ip + `pay/phone`, formData);
      console.log('2',res)
      
      return true;
    } catch (err) {
      console.log('err',err.response)
        alert('Неизвестная ошибка, попробуйте еще раз')
      return false;
    }
  };