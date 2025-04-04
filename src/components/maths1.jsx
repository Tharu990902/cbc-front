import "./maths1.css"
import { useState } from "react";
export default function Maths1() {

    const [count,setCount] = useState(0);
     const [name,setName] = useState("");
 
    function increment(){
        setCount(count + 1);
    }

    function decrement(){   
        setCount(count - 1);
    }

    function changeName(name){
        if(name === "students"){
            setName("students")}
        else if(name === "teachers"){
            setName("teachers")}
        else{
            setName("parents")}
    }

    return (
        <div className="background">
            <h1>{name}</h1>
            <button className= "val" onClick={increment} >+</button>
            <span>{count}</span>
            <button className="val" onClick={decrement}>-</button>
            <div className="but-panel">
                <button onClick={()=>{changeName("students")}} >students</button>
                <button onClick={()=>{changeName("teachers")}}>teachers</button>
                <button onClick={()=>{changeName("parents")}}>parents</button>
            </div>
        </div>
    )
}