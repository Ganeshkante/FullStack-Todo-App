import { useState } from "react";

export default function Counter(){
     const spanCss={
        fontSize:'150px',
        padding:'20px'
    } 

    const buttonCss = {
    backgroundColor: 'purple',        // teal green (modern, calming)
    color: '#fff',
    padding: '12px 24px',
    fontSize: '40px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(59, 126, 198, 0.1)',
    transition: 'all 0.3s ease',
    letterSpacing: '1px'
    };

    const [count,setCount]=useState(0);

    function parent(by){
        setCount(count+by)

    }
    function dparent(by){
        setCount(count-by)

    }

    function reseting(){
        setCount(0)
    }

    return (
    <>
        <span style={spanCss} >{count}</span>
        <CounterComponent by={1} parent={parent} decrementParent={dparent}/>
        <CounterComponent by={2} parent={parent} decrementParent={dparent}/>
        <CounterComponent by={5} parent={parent} decrementParent={dparent}/>
        <button onClick={reseting} style={buttonCss}> reset</button>
      </>
    )
}

 function CounterComponent({by,parent,decrementParent}){

    const buttonCss = {
    backgroundColor: '#00b894',        // teal green (modern, calming)
    color: '#fff',
    padding: '12px 24px',
    fontSize: '40px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(59, 126, 198, 0.1)',
    transition: 'all 0.3s ease',
    letterSpacing: '1px'
    };


    const spanCss={
        fontSize:'150px',
        padding:'20px'
    }

     const [count,setCount]=useState(0);


    function incrementValue(){
        setCount(count+by)
        parent(by)
    
    }
    function decrementValue(){
        setCount(count-by)
        decrementParent(by)
        
    }

    return (
        <div>
            <div >
            <button onClick={incrementValue} style={buttonCss}>+{by}</button>
             <button style={buttonCss} onClick={decrementValue}>-{by}</button> 
            </div>
        </div>
    );
}

