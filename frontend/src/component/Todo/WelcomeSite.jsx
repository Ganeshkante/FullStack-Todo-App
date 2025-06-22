
import { use, useState } from "react"
import { useParams,Link,Navigate} from "react-router-dom"
import { retrieveHelloWorldBean ,retrieveHelloWorldPathVariable} from "./api/HelloWorldBeanApi"
import { useAuthContext } from "./Security/AuthContext"


export default function WelcomeSite(){
    const params=useParams()
    const[message,setMessage]=useState()
    const auth=useAuthContext()
    const username=auth.username
    

    function CallTheRestApi(){

            // retrieveHelloWorldBean()
            //     .then((response)=> successResponse(response))

            retrieveHelloWorldPathVariable(username,auth.token)
                .then((response)=> successResponse(response))
                .catch((error) => console.log(error));
        
    }

    function successResponse(response){
        console.log(response)
        // setMessage(response.data)
        setMessage(response.data.message)
    }
    
    return (
        <div>
            <div> 
                Welcome {params.username}
                <Link to="/todos">Your Todos</Link>
            </div>
            <div>
                <button className="btn btn-success" onClick={CallTheRestApi} >call Rest Api</button>
            </div>
            <div className="text-info">
                {message}
            </div>
        </div>
    )

}