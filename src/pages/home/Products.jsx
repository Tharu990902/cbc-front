/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect , useState } from "react";
import ProductCard from "../../components/ProductCard.jsx";

export default function Products(){

    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading");

    useEffect(()=>{

        if(status === "loading"){
        axios.get("http://localhost:5000/api/product").then((res)=>{
            console.log(res.data);
            setProducts(res.data);
           
        }).catch((err)=>{
            console.log(err);
            setStatus("not found");
        })
    }},[])
    return(
        <div className="w-full h-[calc(100vh-80px)]  bg-[#FFF8F8] overflow-y-scroll flex  flex-wrap items-start  justify-center">
            {
                products.map((product) => 
                    <ProductCard
                        productId={product.productId}
                        productname={product.productname}
                        price={product.price}
                        lastPrice={product.lastPrice}
                        images={product.images}
                        />

            )
                    
            }
        </div>
    )

} 