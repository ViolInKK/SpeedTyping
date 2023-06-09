import {useEffect, useState} from 'react'


const Timer = (props: any) => {

  let {correctWords, startCounting, stopTimer, time} = props

  const [timeElapsed, setTimeElapsed] = useState(time)

  useEffect(() => {
    let id: any

    if(timeElapsed === 0){
      stopTimer((correctWords*(60/time) || 0).toFixed(0))
    }

    if(startCounting){
      id = setInterval(() => {
        setTimeElapsed((oldTime: number) => oldTime - 1)
      }, 1000)
    }

    return () => {
      clearInterval(id)
    }

  }, [startCounting, timeElapsed])

  const mintutes = (time-timeElapsed)/60

  return (
    <div className='Timer'>
    <p>Time: {timeElapsed}</p>
    {/* <p>WPM: {((correctWords/mintutes) || 0).toFixed(0)}</p> */}
  </div>
  )}

export default Timer

