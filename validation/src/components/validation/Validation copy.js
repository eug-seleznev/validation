import { useEffect, useRef, useState } from "react";
import formStyles from '../../styles/forms.module.sass'
import styles from '../../styles/validation.module.sass'

import axios from "axios";
import WinAnimation from "./Animation";
import WinnerPage from "./Winner";

const ip = process.env.REACT_APP_IP;




const ValidationForm = ({link}) => {

  const [inpuRef, setInputFocus] = useFocus()
  const ref = useRef()
  const [focusIndex, setFocusIndex] = useState(1)
  const [validationCode, setValidationCode] = useState('')
    const [code, setCode] = useState({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
    });
    const [winners, setWinner] = useState({
        loaded: false,
        win: null,
        auth: false
    })


    useEffect(() => {
      setInputFocus()
      // console.log(focusIndex)
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
      setValidationCode(Object.values(code).join(""))
      //server validation

      
    }


    const handleCode = (e) => {
    if(e.target.value.length==4 && focusIndex<4){
      setFocusIndex(focusIndex+1)
      // console.log(focusIndex)
      
    }
    setCode({ ...code, [e.target.name]: e.target.value });
    // console.log(code)
    }



    
    return (
      <div>
        {!winners.loaded ? (
          <>
          <h3 className={styles.title}>ПОСЛЕДНИЙ ШАГ</h3>
          <p className={styles.subtitle}>ДЛЯ ПОЛУЧЕНИЯ ПРИЗА ОСТАЛОСЬ ВВЕСТИ ВАЛИДАЦИОННЫЙ КОД, НАПИСАННЫЙ НА ИНСТРУКЦИИ</p>
          <form onSubmit={onSubmit} className={formStyles.validForm}>
            {Object.keys(code).map((key, index) => {
              return (
                <input
                  ref={0 === index ? inpuRef : ref}
                  type="text"
                  name={key}
                  defaultValue={code[key]}
                  placeholder={"-"}
                  maxLength={4}
                  onChange={handleCode}
                />
              );
            })}

            <button type="submit">ВВЕСТИ КОД</button>
          </form>
          </>
        ) : (
          <div>
            {winners.auth ? (
              <WinnerPage win={winners.win} code={validationCode} />
            ) : (
              <div className={styles.incorrect}>
                  <h3>НЕВЕРНЫЙ КОД</h3>
                  <p>ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ НАПИСАНИЯ И ЗАПОЛНИТЕ ФОРМУ ЕЩЕ РАЗ</p>
                  <button
                    onClick={() =>
                      setWinner({ loaded: false, win: null, auth: null })
                    }
                  >
                    ПОВТОРИТЬ
                  </button>
              </div>
            )}
          </div>
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
    // console.log(code, "my code");
    const res = await axios.put(ip + `codes/win/${link}`, code);
    // console.log(res.data);
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