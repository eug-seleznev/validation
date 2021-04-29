import { useEffect, useState, useRef } from "react"
import styles from '../../styles/animation.module.sass'
import { CSSTransition } from 'react-transition-group';
import { useSpring, animated } from '@react-spring/web'

const WinAnimation = ({win, closeAnimation}) => {
  

  const prizes = [20,100,500,1000,2000,5000,4000,10000,100000]
  const [prize, setPrize] = useState(0)
  const [next, setNext] = useState(false)
  const [state, toggle] = useState(true)


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
        setNext(true)
      }
    }
  }

  useEffect(()=>{
    win!=='' && cycle()
  },[win])


  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 1000 },
  })

    const nextt = () => {
      toggle(!state)
      console.log(state)
    }

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
        {next?
        <button onClick={closeAnimation}>ПРОДЛОЖИТЬ</button>:
        <button>???</button>
        }

      <CSSTransition
        in={next}
        timeout={300}
        classNames={{
          enter: styles.winwinEnter,
          enterActive: styles.winwinEnterActive,
          exit: styles.winwinExit,
          exitActive: styles.winwinExitActive,
        }}
        unmountOnExit
        onEnter={() => toggle(!state)}
        // onExited={() => setNext(true)}
      >
      <div className={styles.winwinModal}>
        
        <h1>ВАШ ПРИЗ</h1>
        <animated.div className={styles.prizeBox} style={{
          scale: x.to({
            range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
            output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1],
          }),
        }}>
          <div>
            <h2 style={{
              fontSize: prize <10000 ? '28vw' : prize <100000 ? '22vw' : prize <1000000 ?'19vw' : '16vw '
              }}>{prize}</h2>
            <h3>рублей</h3>
          </div>
        </animated.div>
        <button onClick={closeAnimation}>ПРОДЛОЖИТЬ</button>
        </div>
        
      </CSSTransition>
      </div>
    );
}



export default WinAnimation



