import { createContext, useContext, useState } from "react";
import { basicAuthentication } from "../api/HelloWorldBeanApi";

export const Authcontext=createContext()

export const useAuthContext=()=>useContext(Authcontext)

export default function AuthProvider({children}){
    const [number,setNumber]=useState(0)
    const [isAuthenticated,setAuthentication]=useState(false)
    const [username,setUsername]=useState(null)
    const [token,setToken]=useState(null)

   
     async function login(username,password){
        const baToken="basic "+ window.btoa(username +":"+ password)

        try{
        const response=await basicAuthentication(baToken)

        if(response.status==200){
                setAuthentication(true)
                setUsername(username)
                setToken(baToken)
                return true
            }
            else{
                setAuthentication(false)
                setUsername(null) 
                setToken(null) 
                return false
            }

        }
        catch{
            setAuthentication(false)
                setUsername(null) 
                return false
        }
            
        }

    function logout(){
        setAuthentication(false)
        setToken(null)
    }

    return (
        <Authcontext.Provider value={{number,isAuthenticated,setAuthentication,login,logout,username,token}}>
            {children}
        </Authcontext.Provider>
    )
}