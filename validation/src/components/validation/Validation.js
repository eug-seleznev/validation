import { useEffect, useRef, useState } from "react";


import axios from "axios";
import WinAnimation from "./Animation";

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
      console.log(focusIndex)
      const nextSibling = document.querySelector(
        `input[name=code${focusIndex}]`
      );
      if(nextSibling){
      nextSibling.focus();

      }
    }, [focusIndex])


    const onSubmit = (e) => {
      e.preventDefault();
      setValidationCode(Object.values(code).join(""))
      //server validation

      ValidateCode(validationCode).then((res) => {
        if (res.status) {
          setWinner({ loaded: true, win: res.value, auth: true });
        } else {
          setWinner({ loaded: true, auth: false });
        }
      });
    }


    const handleCode = (e) => {
    if(e.target.value.length==4 && focusIndex<4){
      setFocusIndex(focusIndex+1)
      console.log(focusIndex)
      
    }
    setCode({ ...code, [e.target.name]: e.target.value });
    console.log(code)
    }



    
    return (
      <div>
        {!winners.loaded ? (
          <form onSubmit={onSubmit}>
            {Object.keys(code).map((key, index) => {
              return (
                <input
                  ref={0 === index ? inpuRef : ref}
                  type="text"
                  name={key}
                  defaultValue={code[key]}
                  placeholder={"key"}
                  maxLength={4}
                  onChange={handleCode}
                />
              );
            })}

            <button type="submit">Отправить</button>
          </form>
        ) : (
          <div>
            {winners.auth ? (
              <WinAnimation win={winners.win} code={validationCode} />
            ) : (
              <div>
                <p>
                  <b>Неверный код</b>
                  <button
                    onClick={() =>
                      setWinner({ loaded: false, win: null, auth: null })
                    }
                  >
                    Повторить
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
}


export default ValidationForm







const ValidateCode = async (joinedCode) => {
    try {
        const code ={
          code: joinedCode
        }
        const res = await axios.put(ip + `codes/win`, code);
        console.log(res.data)
        return res.data
    } catch (err) {
          const res = {
              msg: err.response.data.err.msg,
              status: err.response.data.err.status
          }
          return res
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