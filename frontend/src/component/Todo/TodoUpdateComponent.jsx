import {  useParams ,useNavigate, Navigate} from "react-router-dom";
import { AddTodoForUser, retrieveTodoForUser, retriveTodoForUserToUpdate, UpdateViaSendingTodo } from "./api/TodoApi"
import { useAuthContext } from "./Security/AuthContext";
import { useEffect, useState } from "react";
import { Form,Field, Formik ,ErrorMessage} from "formik";
import moment from "moment";

export default function TodoUpdateComponent(){

    const {id} =useParams()

    const auth=useAuthContext()
    const username=auth.username
    const[description,setDescription]=useState('')
    const[targetDate,setTargetDate]=useState('') 
    // const[todos,setTodos]=useState([])
    const navigate =useNavigate()

    useEffect(
        ()=>retriveTodo(),
        [id]
    )

    function retriveTodo(){
        if(id!=-1){
            retriveTodoForUserToUpdate(username,id,auth.token)
            .then((response)=> {
                // console.log(response)
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch((error) => console.log(error));
        }
        
    }

    function onSubmit(values){
        // console.log(values)
        const todo={
            id:id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done:false
        }
        // console.log(todo)
        if(id!=-1){
            UpdateViaSendingTodo(username,id,todo,auth.token)
            .then((response)=> {
            //    CallTheRestApi(),
            navigate("/todos")
            console.log(response)
            })
            .catch((error) => console.log(error));
        }
        else{
            AddTodoForUser(username,todo,auth.token)
            .then((response)=> {
            navigate("/todos")
            console.log(response)
            })
            .catch((error) => console.log(error));
        }
    }

    function validate(values){
        let errors={
            // description: 'enter a des',
            // targetDate: 'Not Valid'
        }
        if(values.description.length<5){
            errors.description='Enter atleat 5 characters'
        }
        if(values.targetDate==null|| values.targetDate==''|| !moment(values.targetDate).isValid){
            errors.targetDate='Enter a Date'
        }
        // console.log(values)
        return errors
    }

    return (
        <div className="container">
            <h1>Updated your Todo:</h1>
            <div>
                
                <Formik initialValues={ {description,targetDate}}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
                validateOnChange={false}
                validateOnBlur={false}
                >
                    {
                        (props)=>(
                            <Form>
                                <ErrorMessage 
                                name="description"
                                component="div"
                                className="alert alert-warning"
                                />
                                <ErrorMessage 
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field name="description" type="text" className="form-control"></Field>
                                </fieldset >

                                 <fieldset className="form-group">
                                    <label>TargetDate</label>
                                    <Field name="targetDate" type="date" className="form-control"/>
                                </fieldset >
                                <div className="mt-3">
                                    <button className="btn btn-success" type ="submit">Save</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}