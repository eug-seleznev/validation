import { useEffect, useRef, useState } from "react";
import formStyles from '../../styles/forms.module.sass'
import styles from '../../styles/validation.module.sass'
import InputMask from 'react-input-mask';
import axios from "axios";
import WinAnimation from "./Animation";
import WinnerPage from "./Winner";
import ErrorScreen from "../errorScreen/error";
import Textfit from 'react-textfit';
const ip = process.env.REACT_APP_IP;




const ValidationForm = ({link}) => {

  const [inpuRef, setInputFocus] = useFocus()
  const ref = useRef()
  const [focusIndex, setFocusIndex] = useState(1)
  const [validationCode, setValidationCode] = useState('')
    const [code, setCode] = useState('');
    const [winners, setWinner] = useState({
        loaded: false,
        win: null,
        auth: false
    })
    const [errMsg, setErrMsg] = useState('')


    useEffect(() => {
      setInputFocus()
      const nextSibling = document.querySelector(
        `input[name=code${focusIndex}]`
      );
      if(nextSibling){
      nextSibling.focus();

      }
    }, [focusIndex])




    const onSubmit = (e) => {
      e.preventDefault()
      const validation = validationCode.split('-').join('')
      // console.log(validation)
      ValidateCode({validation, link}).then((res) => {
        if (res.status) {
          setWinner({ loaded: true, win: res.value, auth: true });
        } else {
          setWinner({ loaded: true, auth: false });
          setErrMsg(res.msg)
        }
      })
    }





    
    return (
      <div>
        {!winners.loaded ? (
          <>
          <Textfit mode="single" className={styles.title}>
              ПОСЛЕДНИЙ ШАГ
          </Textfit>
          <p className={styles.subtitle}>ДЛЯ ПОЛУЧЕНИЯ ПРИЗА ОСТАЛОСЬ ВВЕСТИ ВАЛИДАЦИОННЫЙ КОД, НАПИСАННЫЙ НА ИНСТРУКЦИИ</p>
          <form onSubmit={onSubmit} className={formStyles.validForm}>
          <InputMask mask="****-****-****-****" alwaysShowMask={false} value={validationCode} onChange={e=>setValidationCode(e.target.value)}>
            {(inputProps) => 
            <input {...inputProps} 
              // type="tel" 
              disableUnderline 
                  ref={ref}
                  type="text"
                  name='code'
                  placeholder={"-"}
                  autoCapitalize='none'
                  autoComplete='none'
              />}
          </InputMask>
                {/* <input
                
                  
                /> */}
              <button type="submit">ВВЕСТИ КОД</button>
          </form>
          </>
        ) : (
          winners.auth ? (
              <WinnerPage win={winners.win} code={validationCode.split('-').join('')} />
            ) : (
              <ErrorScreen
                title='НЕВЕРНЫЙ КОД'
                subtitle={errMsg}
                button='ПОВТОРИТЬ'
                onClick={() => setWinner({ loaded: false, win: null, auth: null })}
              />
            )
        )}
      </div>
    );
}


export default ValidationForm







const ValidateCode = async ({ validation, link }) => {
  try {
    const code = {
      code: validation,
    };
    const res = await axios.put(ip + `codes/win/${link}`, code);
    return res.data;
    
  } catch (err) {
    const res = {
      msg: err.response.data.err,
      status: err.response.data.status,
    };
    return res;
  }
};



///focus hook
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};