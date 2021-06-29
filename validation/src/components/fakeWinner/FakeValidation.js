import {  useRef, useState } from "react";
import formStyles from '../../styles/forms.module.sass'
import styles from '../../styles/validation.module.sass'
import InputMask from 'react-input-mask';

import Textfit from 'react-textfit';
import FakeWinAnimation from "./FakeAnimation";
const ip = process.env.REACT_APP_IP;




const FakeValidationForm = ({link}) => {

  const [page, setPage] = useState('validation')
  const ref = useRef()
  const [validationCode, setValidationCode] = useState('')




    const onSubmit = (e) => {
      e.preventDefault()
      if(validationCode.split('').some(el=>el==='_')){
        alert('Заполните поле кода правильно')
      } else {
        setPage('winning')
      }
    }





    
    return (
      <div className={styles.container} >
        <div className={styles.fakeContainer}>
            {page==='validation' ? 
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
                      required='true'
                  />}
              </InputMask>
                  
                  <button type="submit">ВВЕСТИ КОД</button>
              </form>
            </>
            :
            <FakeWinAnimation win={0}/>
          
          }
          </div>
      </div>
    );
}


export default FakeValidationForm









///focus hook
const useFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};