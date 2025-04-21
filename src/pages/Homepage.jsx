import { Routes , Route } from "react-router-dom";
import Loginpage from "./Loginpage.jsx";
import Header from "../components/Header.jsx";
import { Productinfo } from "./home/Productinfo.jsx";

export default function Homepage() {
    return (
        <div className="w-full h-screen bg-[#FFF8F8]">
            <Header />
            <div className="w-full h-[calc(100vh-80px)] bg-red-500">
            <Routes path ="/*">
            <Route path="/login" element={<Loginpage />} />
            <Route path="/productinfo" element={<Productinfo />} />
            </Routes> 
            </div>
             
           

        </div>
        
    );
}