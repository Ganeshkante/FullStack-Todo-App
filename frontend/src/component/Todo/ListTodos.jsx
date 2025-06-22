import { useEffect, useState } from "react";
import { deleteTodoForUser, retrieveTodoForUser, updateTodoForUser } from "./api/TodoApi";
import { useAuthContext } from "./Security/AuthContext";
import { useNavigate } from "react-router-dom";


export default function ListTodos(){
    const todat=new Date()
    const targetDate=new Date(todat.getFullYear() , todat.getMonth() ,todat.getDay())
    const[todos,setTodos]=useState([])
    const[message,setMessage]=useState([])
    const auth=useAuthContext()
    const username=auth.username
    const navigate =useNavigate()
    // const todos=[
    //     // {id:1,description: 'learn AWS',done:false,targetDate:targetDate},
    //     // { id: 2, description: 'learn Spring Boot' ,done:false,targetDate:targetDate},
    //     // { id: 3, description: 'learn Dockert' ,done:false,targetDate:targetDate},
    //     // { id: 4, description: 'learn microservices', done:false,targetDate:targetDate},
        
    // ]

   useEffect(() => {
    CallTheRestApi();
}, []); 


     function CallTheRestApi(){
            retrieveTodoForUser(username,auth.token)
                .then((response)=> 
                    {
                        setTodos(response.data)
                    }
                )
                .catch((error) => console.log(error));
        
    }

    function deleteTodoForUserFunction(id){
        
        deleteTodoForUser(username,id,auth.token)
            .then(()=>{
                setMessage(`delete of todo of id=${id} is success`)
                CallTheRestApi()}
            )
            .catch((error) => console.log(error));
    }

     function updateTodoForUserFunction(id){
        navigate(`/todo/${id}`)
    }

    function AddTodo(){
        navigate(`/todo/-1`)

    }


    return (
        <div className="container">
            <h1>Your Todos are:</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div >
                <table className="table">
                    <thead>
                            <tr>
                                
                                <th>Description</th>
                                <th>is Done?</th>
                                <th>TargetDate</th>
                                <th>Delete</th>
                            </tr>
                    </thead>
                    <tbody>
                        {todos.map(todo=>(
                            <tr key={todo.id}>
                                
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                {/* <td>{todo.targetDate.toDateString()}</td> */}
                                <td>{todo.targetDate.toString()}</td>
                                <td><button className="btn btn-danger" onClick={() =>deleteTodoForUserFunction(todo.id)}>Delete</button></td>
                                <td><button className="btn btn-success" onClick={() =>updateTodoForUserFunction(todo.id)}>Update</button></td>
                            </tr>
                        ))}
                            
                    </tbody>
                </table>
                <div>
                    <button className="btn btn-success m-3" onClick={AddTodo}> Add Todo</button>
                </div>
                
            </div>
        </div>
    )
}