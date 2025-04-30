import { useEffect, useState } from "react";
import { Loadcard } from "../../../utils/cardfunction.js";
import CartFrame from "../../components/cardFrame.jsx";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [labeldTotal , setLabeldTotal] = useState(0);

  useEffect(() => {
    setCart(Loadcard());
    console.log(Loadcard());

    axios.post(import.meta.env.VITE_Backend_url +"/api/order/quote" , {
      order_items: Loadcard() }
    ).then((res)=>{
      console.log(res.data)
      setTotal(res.data.Total)
      setLabeldTotal(res.data.labeldTotal)
      
    })
  }, []);

  function onOrderCheckoutClick(){

    const token = localStorage.getItem("token");
    if(token == null){
      return
    }
    axios.post(
      `${import.meta.env.VITE_Backend_url}/api/order`,
      {
        order_items: cart,
        name: "tharu",
        address: "dickwella",
        phoneNo: "07865543"
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    
    
    ).then((res)=>{
      console.log(res.data)
    })
  }

  return (
    <div className=" w-full h-[calc(100vh-80px)]  bg-[#FFF8F8] overflow-y-scroll flex  flex-wrap items-start    justify-center">
    
    <div className="flex flex-col items-center p-4 w-[700px] ">
      {cart.length > 0 ? (
        cart.map((item) => (
          <CartFrame key={item.productId} productId = {item.productId} qty= {item.qty}/>
        ))
      ) : (
        <p className="text-gray-500 ">Cart is empty.</p>
      )}

      <div>
      <h1 className="text-3xl font-bold text-blue-600">Labeld Total: LKR. {labeldTotal}</h1>
      <h1 className="text-3xl font-bold text-blue-600">Discount: LKR. {labeldTotal - Total}</h1>
      <h1 className="text-3xl font-bold text-blue-600">Total: LKR. {Total}</h1>
       <button className="flex justify-center items-end w-[100px] bg-slate-500 hover:bg-blue-400 rounded-lg text-cyan-50"onClick={onOrderCheckoutClick} >checkout</button>
       </div>
    </div>
    </div>
   
    
    
  );
}
