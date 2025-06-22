import axios from "axios";


export function retrieveTodoForUser(username,token){
    return (
        axios.get(`http://localhost:8080/user/${username}/todo`,{

            headers:{
                Authorization:token
            }
        })

    )
}

export function deleteTodoForUser(username,id,token){
    return (
        axios.delete(`http://localhost:8080/user/${username}/todo/${id}`,{

            headers:{
                Authorization:token
            }
        })

    )
}

export function retriveTodoForUserToUpdate(username,id,token){
    return (
        axios.get(`http://localhost:8080/user/${username}/todo/${id}`,{

            headers:{
                Authorization:token
            }
        })

    )
}

export function UpdateViaSendingTodo(username,id,todo,token){
    return (
        axios.put(`http://localhost:8080/user/${username}/todo/${id}`,todo,{

            headers:{
                Authorization:token
            }
        })

    )
}

export function AddTodoForUser(username,todo,token){
    return (
        axios.post(`http://localhost:8080/user/${username}/todo`,todo,{

            headers:{
                Authorization:token
            }
        })

    )
}