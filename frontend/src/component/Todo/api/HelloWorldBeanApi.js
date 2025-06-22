import axios from "axios";

export function retrieveHelloWorldBean(){
    return (
        axios.get('http://localhost:8080/hello-world-bean')

    )

}
export function retrieveHelloWorldPathVariable(username,token){
    return (
        axios.get(`http://localhost:8080/hello-world/path-variable/${username}`,{

            headers:{
                Authorization: token
            }
        })

    )
}

export function basicAuthentication(token){
    return (
        axios.get(`http://localhost:8080/basicAuth`,{

            headers:{
                Authorization:token
            }
        })

    )
}
