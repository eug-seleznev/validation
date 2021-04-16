import { useState } from "react";


import axios from "axios";

const ip = process.env.REACT_APP_IP;




const ValidationForm = () => {


    const [code, setCode] = useState({
        code: ''
    })
    const [winners, setWinner] = useState({
        loaded: false,
        win: null,
        auth: false
    })

    const onSubmit = (e) => {
      e.preventDefault();
      //server validation
      ValidateCode(code).then((res) => {
        console.log(res, 'res here')
        if (res.status) {
            console.log('success')
          setWinner({ loaded: true, win: res.value, auth: true });
        } else {
            console.log('ermmmmm')
          setWinner({ loaded: true, auth: false });
        }
      });
    }


    
    return (
      <div>
        {!winners.loaded ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Валидационный код"
              defaultValue={code}
              onChange={(e) => setCode({ code: e.target.value })}
            />
            <button type="submit">Отправить</button>
          </form>
        ) : (
          <div>
            {winners.auth ? (
              <div>
                <p> win {winners.win}</p>
              </div>
            ) : (
              <div>
                <p> уже использоваили</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
}


export default ValidationForm







const ValidateCode = async (code) => {
    try {
        console.log(code)
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