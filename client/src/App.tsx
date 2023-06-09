import './App.css'
import { useState, useRef} from 'react'
import Timer from '../src/components/Timer'
import Word from './components/Word'

const getCloud = () => `she mean old much word will last any also real again a into from way many run person leave make child some move in man from mean at way to govern never look very down increase under high into some all say seem he as those one last off play over system another last number nation and do present want use those who over day point turn nation open never so hold the system early year they work any order have feel play must run come we just when life place a around change life should write which any know`.split(' ')

function App() {

  const lettersArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  const [userInput, setUserInput] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [correctLetterArray, setCorrectLetterArray] = useState([[]])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [startCounting, setStartCounting] = useState(false)
  const [finished, setFinished] = useState(false)
  const [time, setTime] = useState(60)
  const [stack, setStack] = useState<String[]>([])
  const [wordBoxActive, setWordBoxActive] = useState(false)
  const [WPM, setWPM] = useState(0)
  let cloud = useRef(getCloud())

  const letters = cloud.current.slice(currentWordIndex, currentWordIndex+1).toString().split("")
  const wordLettersArray = cloud.current.map((word) => {return (word.split(""))})


  const stopTimer = (WPM:number) => {
    setWPM(WPM)
    setFinished(true)
    setStartCounting(false)
  }

  const reset = () => {
    setTime(60) 
    setFinished(false)
    setStartCounting(false)
    setCurrentLetterIndex(0)
    setCurrentWordIndex(0)
    setCorrectLetterArray([[]])
    setCorrectWordArray([])
    setUserInput('')
    setStack([])
    cloud.current = getCloud()
  }

  const processKeyDown = (e:any) => {


    if(e.key === " "){
      if(currentLetterIndex == 0){
        return 0
      }
      cloud.current.push(cloud.current[(Math.floor(Math.random() * cloud.current.length))])
      
      setStack([])
      setCorrectLetterArray((data:any):any => {
        const newResult = [...data]
        newResult.push([])
        return newResult
      })
      setCurrentLetterIndex(0)
      setCurrentWordIndex(index => index + 1)
      
      setCorrectWordArray((data: any) => {
        const word = e.target.value.trim()
        const newResult:any = [...data]
        newResult[currentWordIndex] = word === cloud.current[currentWordIndex]
        return newResult 
      })

    }
    else if(e.key === "Backspace"){
      
      setStack((data: any):any => {
        let copy = [...data]
        copy.pop()
        return copy
      })
      setCorrectLetterArray((data:any):any => {
        const newResult = [...data]
        newResult[currentWordIndex][currentLetterIndex] = null
        return newResult
      })
      setCurrentLetterIndex((data:number):any => {
        if(data === 0){
          return 0
        }
        else{
          return data-=1
        }
      })
    }
    else if(lettersArray.includes(e.key)){
      setStack((data:any):any => {
        let copy = [...data]
        copy.push(e.key)
        return copy
      })
      setCorrectLetterArray((data:any):any => {
        const newResult = [...data]
        newResult[currentWordIndex][currentLetterIndex] = letters[currentLetterIndex] === e.key
        return newResult
      })
      setCurrentLetterIndex((data:number):any => {
        return data+=1
      })
    }
  }

  const processInput = (e: any) => {
    setStartCounting(true)

    if(e.target.value.endsWith(' ')){
      setUserInput('')
    } else{
      setUserInput(e.target.value)
    }
  }

  return (
    <div className='App'>

        <div>{startCounting ? <Timer 
          className="Timer"
          startCounting={startCounting}
          correctWords={correctWordArray.filter(Boolean).length}
          stopTimer={stopTimer}
          time = {time}
        /> : finished ? <div style={{display: "flex"}}><button onClick={() => reset()}>restart</button><p style={{marginLeft:"2em"}}>Words per minute: {WPM}</p></div> : <div className='Timer-settings'>
          <button onClick={() => {setTime(15)}} className={time === 15 ? 'active' : ''}>15</button>
          <button onClick={() => {setTime(30)}} className={time === 30 ? 'active' : ''}>30</button>
          <button onClick={() => {setTime(60)}} className={time === 60 ? 'active' : ''}>60</button>
          </div>}
        </div>

      {wordBoxActive ? null : <h3 style={{marginBottom: "0.3em", fontSize: "2rem", position: "absolute"}}>Click to start typing</h3>}
      <div className={wordBoxActive ? "words-box" : "blur"}  onClick={() => {
        const element = document.getElementById("input")
        element?.focus()
        }}>
        <p>{wordLettersArray.map((word, index) => {
          return <Word 
                  word={word}
                  active = {index === currentWordIndex} 
                  correctLetters={correctLetterArray[index]}
                  currentLetter={currentLetterIndex}
                  />
          })}
        </p>
      </div>

      { finished ? null : <input type='text' id={"input"} onFocus={() => setWordBoxActive(true)} onBlur={() => setWordBoxActive(false)} value={userInput} onChange={(e) => processInput(e)} onKeyDown={(e) => processKeyDown(e)}></input>}
      
    </div>
  )
}

export default App

