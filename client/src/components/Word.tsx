import {memo} from 'react'

const Word1 = memo((props: any):any => {

    const {word, active, correctLetters, currentLetter} = props

    // console.log(mapIndex)
    return <div style={{display: "inline"}}>{" "} {word.map((letter:string, index:number) => {
        if(typeof correctLetters == "undefined"){
            return <span>{letter}</span>
        }
        else{
            if(active && currentLetter == index){
                return <span style={{color: "#7bd6ff"}}>{letter}</span>
            }
            if(correctLetters[index] == true){
                return <span style={{color: "rgb(12, 168, 12)"}}>{letter}</span>
            }
            if(correctLetters[index] == false){
                return <span style={{color: "red"}}>{letter}</span>
            }
            return <span>{letter}</span>

        }
    })}</div>

  })

  export default Word1