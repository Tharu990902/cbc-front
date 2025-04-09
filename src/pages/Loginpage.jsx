import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Loginpage() {

    const[email, setEmail] = useState("your email")
    const[password, setPassword] = useState("");

    function handleLogin(){
        
        axios.post("http://localhost:5000/api/user/login" , {
            email:email,
            password:password
        }).then((response) => {
            if(response.data.user == null){
                toast.error(response.data.message);
                return;
            }
            
            localStorage.setItem("token", response.data.token); // store token
            if(response.data.user.type === "admin"){
                window.location.href = "/admin";
            }
            else if (response.data.user.type === "customer") {
                window.location.href = "/";
            }
            
        }
        ).catch((error) => {
            console.log(error);
            alert("Invalid credentials");
        });

    }
    return (
        <div className="flex items-center justify-center w-full h-screen bg-red-300">

            <div className=" h-[450px] w-[450px] bg-gray-400 flex items-center justify-center flex-col rounded-lg shadow-lg">

                <img src="../../public/logo.jpg" alt="Logo" className="w-20 h-20 mb-10 rounded-full" />

                <span>Email</span>
                <input type="text" defaultValue={email}  onChange ={(e)=>{setEmail(e.target.value)}}  className="w-[300px] h-10 mb-5 rounded-md" />

                <span>Password</span>
                <input type="password" defaultValue={password} onChange={(e)=>{setPassword(e.target.value)}} className="w-[300px] h-10 mb-5 rounded-md" />
                <button className="bg-blue-400" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}
