import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";


export default function Loginpage() {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: ((res)=>{
      axios.post(`${import.meta.env.VITE_Backend_url}/api/user/google`, {
        token: res.access_token,
      }).then((res)=>{
        console.log(res);
        if(res.data.message === "New user created"){
          toast.success("New user created then you can login");
          console.log("New user created");
          navigate("/login");
        }else {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user_email", res.data.user.email);
          if (res.data.user.type === "admin") {
            navigate("/admin/dashboard");
          } else if (res.data.user.type === "customer") {
            navigate("/");
          }
        }
      })
    }),
  });

  const handleLogin = () => {
    axios
      .post(`${import.meta.env.VITE_Backend_url}/api/user/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.user == null) {
          toast.error(response.data.message);
          return;
        }

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_email", response.data.user.email);
      
        if (response.data.user.type === "admin") {
          navigate("/admin/dashboard");
        } else if (response.data.user.type === "customer") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid credentials");
      });
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-blue-200 to-purple-300">
      <Toaster />
      <div className="bg-white rounded-xl shadow-lg p-8 w-[90%] max-w-md flex flex-col items-center">
        <img
          src="/logo.jpg"
          alt="Logo"
          className="w-20 h-20 mb-6 rounded-full shadow-md"
        />
        <h1 className="mb-4 text-2xl font-bold text-gray-700">Welcome Back</h1>

        <div className="w-full mb-4">
          <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full mb-6">
          <label
            htmlFor="password"
            className="block mb-1 text-sm text-gray-600"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border rounded-md shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Login
        </button>

        <button className="w-[300px] mt-3 px-4 py-2 text-white transition duration-200 bg-slate-500 rounded-md hover:bg-blue-700"
                                     onClick={login()}>Login with Google Account</button>

        <p className="mt-4 text-sm text-gray-500">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
