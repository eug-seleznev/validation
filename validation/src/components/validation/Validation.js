import { useEffect, useRef, useState } from "react";
import formStyles from '../../styles/forms.module.sass'
import styles from '../../styles/validation.module.sass'
import InputMask from 'react-input-mask';
import axios from "axios";
import WinAnimation from "./Animation";
import WinnerPage from "./Winner";
import ErrorScreen from "../errorScreen/error";

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


    useEffect(() => {
      setInputFocus()
      console.log(focusIndex)
      const nextSibling = document.querySelector(
        `input[name=code${focusIndex}]`
      );
      if(nextSibling){
      nextSibling.focus();

      }
    }, [focusIndex])



    useEffect(() => {
      if(validationCode.length>4){
          ValidateCode({validationCode, link}).then((res) => {
            if (res.status) {
              setWinner({ loaded: true, win: res.value, auth: true });
            } else {
              setWinner({ loaded: true, auth: false });
            }
          });
      }
      
    }, [validationCode]);

    const onSubmit = (e) => {
      e.preventDefault();
      const validation = code.split('-').join('')
      setValidationCode(validation)
      //server validation
    }


    const handleCode = (e) => {
  
    setCode(e.target.value);
    }



    
    return (
      <div>
        {!winners.loaded ? (
          <>
          <h3 className={styles.title}>ПОСЛЕДНИЙ ШАГ</h3>
          <p className={styles.subtitle}>ДЛЯ ПОЛУЧЕНИЯ ПРИЗА ОСТАЛОСЬ ВВЕСТИ ВАЛИДАЦИОННЫЙ КОД, НАПИСАННЫЙ НА ИНСТРУКЦИИ</p>
          <form onSubmit={onSubmit} className={formStyles.validForm}>
          <InputMask mask="****-****-****-****" alwaysShowMask={false} value={code} onChange={handleCode}>
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
              <WinnerPage win={winners.win} code={validationCode} />
            ) : (
              <ErrorScreen
                title='НЕВЕРНЫЙ КОД'
                subtitle='ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ НАПИСАНИЯ И ЗАПОЛНИТЕ ФОРМУ ЕЩЕ РАЗ'
                button='ПОВТОРИТЬ'
                onClick={() => setWinner({ loaded: false, win: null, auth: null })}
              />
            )
        )}
      </div>
    );
}


export default ValidationForm







const ValidateCode = async ({ validationCode, link }) => {
  try {
    const code = {
      code: validationCode,
    };
    console.log(code, "my code");
    const res = await axios.put(ip + `codes/win/${link}`, code);
    console.log(res.data);
    return res.data;
  } catch (err) {
    const res = {
      msg: err.response.data.err.msg,
      status: err.response.data.err.status,
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