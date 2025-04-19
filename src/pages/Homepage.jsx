import { Routes , Route } from "react-router-dom";
import Adminproductpage from "./admin/adminproductpage.jsx";
import Header from "../components/Header.jsx";

export default function Homepage() {
    return (
        <div className="w-full h-screen bg-[#FFF8F8]">
            <Header />
             <Routes path ="/*">
             <Route path="/products" element={<Adminproductpage />} />
            </Routes> 
           

        </div>
        
    );
}