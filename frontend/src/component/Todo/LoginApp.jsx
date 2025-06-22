import { useNavigate} from "react-router-dom"
import { useState } from "react"
import { useAuthContext } from "./Security/AuthContext"


export default function LoginApp(){

        const[username,setUser]=useState('Ganesh')
        const[password,setPass]=useState('wow')
        const[showSucess,setShowSucessAuthentication]=useState(false)
        const[showPassword,setShowPassAuthentication]=useState(false)
        const Navigate=useNavigate()
        const auth=useAuthContext()
        

        function handleChange(event){
            
            setUser(event.target.value)
        }
        function handleChangePassword(event){
            
            setPass(event.target.value)
        }

        async function loginAuthentication(){
            if(await auth.login(username,password)){
                Navigate(`/welcome/${username}`)
            }
            else{
                setShowSucessAuthentication(false)
                setShowPassAuthentication(true)
            }
        }

        

        return(
            <div>
               
                {showPassword && <div>Fail</div>}
                
                <div>
                    <label>username</label>
                    <input type="text" value={username} onChange={handleChange}></input>
                </div>
                <div>
                    <label>passowrd</label>
                    <input type="password" value={password} onChange={handleChangePassword}></input>
                </div>
                <div>
                    <button onClick={loginAuthentication}>login</button>
                </div>
            </div>
        )
    }