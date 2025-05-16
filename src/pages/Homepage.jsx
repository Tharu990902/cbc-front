import { Routes , Route } from "react-router-dom";
import Loginpage from "./Loginpage.jsx";
import Header from "../components/Header.jsx";
import Productinfo  from "./home/Productinfo.jsx";
import SignUpPage from "./Signinpage.jsx";
import Products from "./home/Products.jsx";
import Cart from "./home/card.jsx";
import Shippingpage from "./home/shippingpage.jsx";
import OrderPage from "./home/order.jsx";

export default function Homepage() {
    return (
        <div className="w-full h-screen bg-[#FFF8F8]">
            <Header />
            <div className="w-full h-[(100vh - 80px)]">
            <Routes path ="/*">
            <Route path="/login" element={<Loginpage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route path="/productinfo/:id" element={<Productinfo/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path = "/shipping" element={<Shippingpage/>} />
            <Route path ="/orders" element={<OrderPage/>} />
            </Routes> 
            </div>
             
           

        </div>
        
    );
}