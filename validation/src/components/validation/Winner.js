import axios from "axios";
import { useEffect, useRef, useState } from "react"
import WinAnimation from "./Animation";
import styles from '../../styles/winner.module.sass'
import CardPage from "./card";
import InputMask from 'react-input-mask';

const ip = process.env.REACT_APP_IP;

const WinnerPage = ({win, code}) => {


    const [formOpen, setFormOpen] = useState(true)
    const [animationModal, setAnimModal] = useState(true)
    const [registret, setRegistret] = useState(false)
    const [formData, setFormData] = useState({
      firstname: "",
      email: "",
      lastname: "",
      phone: "",
      code: code,
    });
    useEffect(()=>{
        setFormData({...formData,code: code})
    },[code])


    const checkInputs = (e) => {
        e.preventDefault()
        setFormOpen(false)
    }
         //user info handlers
    const submitUserInfo = (e) => {
          e.preventDefault();
          const phone = formData.phone.replace(/\D/g,'').substring(1)
          const newData = {...formData, phone: phone}
          NewUser(newData).then((res) => {
            if(res.status){
              setRegistret(res.status);
            }
          })
        };

        const userHandler = (e) => {
            setFormData({...formData, [e.target.name]: e.target.value})
        };
        

        
    return (
      <div className={styles.winnerPage}>
          {animationModal && <WinAnimation win={win} closeAnimation={()=>setAnimModal(false)} />}
        
          {formOpen ? <form
            onSubmit={checkInputs}
            style={{ display: "flex", flexDirection: "column" }}
          >
              <h1>МОИ ДАННЫЕ</h1>
              <p>Заполните форму для получение выигрыша</p>
              <input
                type="email"
                name="email"
                placeholder='e-mail'
                defaultValue={formData.email}
                onChange={userHandler}
              />
              <input
                type="text"
                name="firstname"
                placeholder='Имя'
                defaultValue={formData.firstname}
                onChange={userHandler}
              />
              <input
                type="text"
                name="lastname"
                placeholder='Фамилия'
                defaultValue={formData.lastname}
                onChange={userHandler}
              />

            <InputMask mask="+7 (999)-999-99-99" alwaysShowMask={false} value={formData.phone} onChange={userHandler}>
              {(inputProps) => 
              <input {...inputProps} 
                disableUnderline 
                type='text'
                    inputmode="numeric"
                    name="phone"
                    placeholder='Телефон'
                    autoCapitalize='none'
                    autoComplete='none'
                />}
            </InputMask>
              
            <button>СОХРАНИТЬ</button>
            <p>Форма доступна в течение недели</p>
          </form>
        : registret?
            <CardPage win={win} code={code} />
        :
            <div className={styles.checkInputs}>
              <h1>МОИ ДАННЫЕ</h1>
              <p>Проверьте ваши данные</p>
              <h2>E-mail: <p>{formData.email}</p></h2>
              <h2>Имя: <p>{formData.firstname}</p></h2>
              <h2>Фамилия: <p>{formData.lastname}</p></h2>
              <h2>Телефон: <p>{formData.phone}</p></h2>
              <button onClick={submitUserInfo} className={styles.submit}>ОТПРАВИТЬ</button>
              <button onClick={()=>setFormOpen(true)} className={styles.change}>ИЗМЕНИТЬ</button>
            </div>}


     
      </div>
    );
}



export default WinnerPage







//reg new user
const NewUser = async (formData) => {
  try {
    console.log('1')

    const fullPhone = '7'+formData.phone
    const newFormData = {...formData, phone: fullPhone}
    console.log('2',newFormData)
    const res = await axios.put(ip + `codes/claim`, newFormData);
    console.log('3',res);
    const data = {
      msg: res.data,
      status: true
    }
    return data;
  } catch (err) {
    const res = {
      msg: err.response.data.err,
      status: false,
    };
    return res;
  }
};