import { useEffect, useState, useRef, Suspense } from "react"
import styles from '../../styles/animation.module.sass'
import { CSSTransition } from 'react-transition-group';
import { useSpring, animated } from '@react-spring/web'
import Textfit from 'react-textfit'
import {Glitch, EffectComposer,} from '@react-three/postprocessing'
import {Canvas, useFrame} from '@react-three/fiber'
import NewCanvas from "./canvas";

const WinAnimation = ({win, closeAnimation}) => {
  

  const prizes = [20,100,500,1000,2000,5000,4000,10000,100000]
  const [prize, setPrize] = useState(0)
  const [next, setNext] = useState(false)
  const [state, toggle] = useState(false)

  

  const setPrizes = () => {
    const random = Math.floor(Math.random() * (prizes.length-1))
    setPrize(prizes[random]) 
  }
  
  const timeout = () =>{ 
    return new Promise(function(res,rej) {
        setTimeout(()=>{
          setPrizes()
          navigator.vibrate(50)
          res(true) 
        },120)
  })}

  const cycle = async () =>{ 
    for (let i=0; i<40; i++){
      if(i<39){
        await timeout()
      } else {
        setPrize(win)
        setNext(true)
      }
    }
  }

  useEffect(()=>{
    win!=='' && cycle()
  },[win])


  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 0 : 1,
    config: { duration: 500 },
  })

  const vibration = () => {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
    console.log(navigator)
    if (navigator.vibrate) {
      // vibration API supported
        navigator.vibrate(1000);
    }
  }
   const winwinEntered = () => {
    toggle(true)
    vibration()
   }
   useEffect(()=>{
      state && vibration()

   },[state])

    return (
      <div className={styles.animation}>
        <h1>ВАШ ПРИЗ</h1>
            
        <div className={styles.prizeBox}>
          <div className={styles.innerBox}>
            <div className={styles.canvas}>
              <NewCanvas win={prize} delay={0.12} />
            </div>
            {/* <Textfit mode="single" className={styles.prize} max={120} >
              {prize}
            </Textfit> */}
            <h3>рублей</h3>
          </div>
        </div>
        {next?
        <button onClick={closeAnimation}>ПРОДЛОЖИТЬ</button>:
        <button>???</button>
        }

      <CSSTransition
        in={next}
        timeout={500}
        classNames={{
          enter: styles.winwinEnter,
          enterActive: styles.winwinEnterActive,
          exit: styles.winwinExit,
          exitActive: styles.winwinExitActive,
        }}
        unmountOnExit
        onEntered={() => winwinEntered()}
        // onExited={() => setNext(true)}
      >
      <div className={styles.winwinModal}>
        <animated.div style={{
            rotateZ: x.to({
              range: [0, 0.10, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [0, -5 , 5, -5, 5, -5, 5, -5, 0],
            }),
            
          }}>
          
          <h1>ВАШ ПРИЗ</h1>
          <div className={styles.winwinPrizeBox} >
            <div className={styles.winwinInnerBox}>
              <Textfit mode="single" className={styles.prize} max={120} >
                {prize}
              </Textfit>
              <h2 className={styles.winwinRub}>рублей</h2>
            </div>
          </div>
          <button onClick={closeAnimation}>ПРОДЛОЖИТЬ</button>
          </animated.div>
        </div>
      </CSSTransition>



      </div>
    );
}



export default WinAnimation



