import axios from "axios";
import { useEffect, useState, useRef } from "react"
import styles from '../../styles/animation.module.sass'

const ip = process.env.REACT_APP_IP;

const WinAnimation = ({win, closeAnimation}) => {
  
  const winSize = win <10000 ? '28vw' : win <100000 ? '22vw' : win <1000000 ?'19vw' : '16vw '

    return (
      <div className={styles.animation}>
        <h1>ВАШ ПРИЗ</h1>
        <div className={styles.prizeBox}>
          <div>
            <h2 style={{fontSize: winSize}}>{win}</h2>
            <h3>рублей</h3>
          </div>
        </div>
        <button onClick={closeAnimation}>ПРОДЛОЖИТЬ</button>
      </div>
    );
}



export default WinAnimation







//reg new user
const NewUser = async (formData) => {
  try {
    
    const res = await axios.put(ip + `codes/claim`, formData);
    console.log(res.data);
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