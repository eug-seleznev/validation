import { useEffect, useState, useRef } from "react"
import styles from '../../styles/animation.module.sass'

const WinAnimation = ({win, closeAnimation}) => {
  

  const prizes = [20,100,500,1000,2000,5000,4000,10000,100000]
  const [prize, setPrize] = useState(0)


  const setPrizes = () => {
    const random = Math.floor(Math.random() * (prizes.length-1))
    setPrize(prizes[random]) 
  }
  
  const timeout = () =>{ 
    return new Promise(function(res,rej) {
        setTimeout(()=>{
          setPrizes()
          res(true) 
        },150)
  })}

  const cycle = async () =>{ 
    for (let i=0; i<40; i++){
      if(i<39){
        await timeout()
      } else {
        console.log(i,win)
        setPrize(win)
      }
    }
  }

  useEffect(()=>{
    win!=='' && cycle()
  },[win])


  


    return (
      <div className={styles.animation}>
        <h1>ВАШ ПРИЗ</h1>
        <div className={styles.prizeBox}>
          <div>
            <h2 style={{
              fontSize: prize <10000 ? '28vw' : prize <100000 ? '22vw' : prize <1000000 ?'19vw' : '16vw '
              }}>{prize}</h2>
            <h3>рублей</h3>
          </div>
        </div>
        <button onClick={closeAnimation}>ПРОДЛОЖИТЬ</button>
      </div>
    );
}



export default WinAnimation



