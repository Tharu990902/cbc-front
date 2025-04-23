import { Routes , Route } from "react-router-dom";
import Loginpage from "./Loginpage.jsx";
import Header from "../components/Header.jsx";
import Productinfo  from "./home/Productinfo.jsx";
import SignUpPage from "./Signinpage.jsx";

export default function Homepage() {
    return (
        <div className="w-full h-screen bg-[#FFF8F8]">
            <Header />
            <div className="w-full h-[(100vh - 80px)]">
            <Routes path ="/*">
            <Route path="/login" element={<Loginpage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/productinfo/:id" element={<Productinfo/>} />
            </Routes> 
            </div>
             
           

        </div>
        
    );
}