import '../App.css'
import { useState, useEffect} from 'react'
import Timer from '../components/Timer'
import Word from '../components/Word'
import axios from 'axios'

function MainPage() {

  const lettersArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  const [userInput, setUserInput] = useState('')
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [correctWordArray, setCorrectWordArray] = useState([])
  const [correctLetterArray, setCorrectLetterArray] = useState([[]])
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0)
  const [startCounting, setStartCounting] = useState(false)
  const [finished, setFinished] = useState(false)
  const [time, setTime] = useState(60)
  const [stack, setStack] = useState<string[]>([])
  const [wordBoxActive, setWordBoxActive] = useState(false)
  const [WPM, setWPM] = useState(0)
  const [cloud, setCloud] = useState<string[]>([])


  useEffect(() => {
    axios.get('http://localhost:7000/api/words')
    .then(res => {
      setCloud(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])



  const letters = cloud.slice(currentWordIndex, currentWordIndex+1).toString().split("")
  const wordLettersArray: string[][] = cloud.map((word: string) => {return (word.split(""))})





  const stopTimer = (WPM:number) => {
    setWPM(WPM)
    setFinished(true)
    setStartCounting(false)
  }

  const reset = () => {

    axios.get('http://localhost:7000/api/words')
    .then(res => {
      setCloud(res.data)
    })
    .catch(err => {
      console.log(err)
    })

    setTime(60) 
    setFinished(false)
    setStartCounting(false)
    setCurrentLetterIndex(0)
    setCurrentWordIndex(0)
    setCorrectLetterArray([[]])
    setCorrectWordArray([])
    setUserInput('')
    setStack([])
    
  }

  const processKeyDown = (e: any) => {


    if(e.key === " "){
      if(currentLetterIndex == 0){
        return 0
      }
      cloud.push(cloud[(Math.floor(Math.random() * cloud.length))])
      
      setStack([])
      setCorrectLetterArray((data: string[][]):any => {
        const newResult = [...data]
        newResult.push([])
        return newResult
      })
      setCurrentLetterIndex(0)
      setCurrentWordIndex(index => index + 1)
      
      setCorrectWordArray((data: string[][]) => {
        const word = e.target.value.trim()
        const newResult: any = [...data]
        newResult[currentWordIndex] = word === cloud[currentWordIndex]
        return newResult 
      })

    }
    else if(e.key === "Backspace"){
      
      setStack((data: string[]):any => {
        let copy = [...data]
        copy.pop()
        return copy
      })
      setCorrectLetterArray((data:any):any => {
        const newResult = [...data]
        newResult[currentWordIndex][currentLetterIndex] = null
        return newResult
      })
      setCurrentLetterIndex((data:number):number => {
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
      setCurrentLetterIndex((data:number):number => {
        return data+=1
      })
    }
  }

  const processInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartCounting(true)

    if(e.target.value.endsWith(' ')){
      setUserInput('')
    } else{
      setUserInput(e.target.value)
    }
  }

  return (
    <div className='App'>
        <div className='typeTestContainer'>
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
          <p>{wordLettersArray.map((word: string[], index: number) => {
            return <Word 
                    word={word}
                    active = {index === currentWordIndex} 
                    correctLetters={correctLetterArray[index]}
                    currentLetter={currentLetterIndex}
                    />
            })}
          </p>
        </div>
        </div>

        { finished ? 
        null : 
        <input type='text'
        className='typing-test' 
        id={"input"} 
        onFocus={() => setWordBoxActive(true)} 
        onBlur={() => setWordBoxActive(false)} 
        value={userInput} 
        onChange={(e) => processInput(e)} 
        onKeyDown={(e) => processKeyDown(e)}></input>}
        
      </div>
  )
}

export default MainPage

