import axios from "axios";
import { useState } from "react";
import Cookies from 'universal-cookie';



function Login() {

    const cookies = new Cookies()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const testClick = async (e: React.FormEvent) => {
        e.preventDefault()

        await axios.get('http://localhost:7000/api/users', {
            headers: {
                'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMiIsImlkIjo4LCJpYXQiOjE2ODc5MzM1MDAsImV4cCI6MTY4ODAxOTkwMH0.xP_FhnQ-xXYlE2W9BbvIPY3wNLdl4_Fp03muc-770lg`
            }
        }).then((res) => {
            console.log(res)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await axios.post('http://localhost:7000/api/auth/login', {
            "email": username,
            "password": password
        }, {
            headers: {
              'Content-Type': 'application/json', 
            }
          }).then((res) => {
            localStorage.setItem('token', JSON.stringify(res))
            console.log("got response",res)
          })
          .catch((err) => {
            console.log("error",err)
          })

        const user = {username, password}
        console.log(user)
    }

    return (
        <div className="App">
            <div className="form">
                <form onSubmit={testClick}>
                    <label>username</label>
                        <div className="user-box">
                            <input value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}></input>
                        </div>
                    <label>password</label>
                        <div className="password-box">
                            <input type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}></input>
                        </div>
                    <div>
                        <button style={{background: "rgb(32 36 38)"}}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Login