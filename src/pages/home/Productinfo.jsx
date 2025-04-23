/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageslider";

export default function Productinfo() {
    const params = useParams();
    const productId = params.id;

    const [product, setProduct] = useState(null);
    const [status, setstatus] = useState("loading"); 
    
    
    useEffect(() => {
        
        console.log(productId);
        axios.get("http://localhost:5000/api/product/" + productId)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data);
                if (res.data == null) {
                    setstatus("not found");
                } else {
                    setstatus("found");
                }
            })
    }, []);
    
    return (
        <div className="w-full h-[calc(100vh-80px)]">
            {status === "loading" && (<div className="flex items-center justify-center w-full h-full">
                <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            </div> )}
            {status === "not found" && (
                <div className="flex flex-col items-center justify-center w-full h-full text-center">
                    <h1 className="mb-2 text-2xl font-semibold text-red-600">Product Not Found</h1>
                    <p className="text-gray-500">We couldn’t find the product you’re looking for.</p>
                </div>
                )}
            {status === "found" && product && (
  <div className="flex items-center justify-center w-full h-full px-6 py-10 bg-gray-50">
    <div className="flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-xl md:flex-row rounded-2xl">
      
      {/* Image section */}
      <div className="w-full h-64 md:w-1/2 md:h-auto">
        <ImageSlider images={product.images} />
      </div>

      {/* Info section */}
      <div className="flex flex-col justify-center w-full p-6 md:w-1/2">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">{product.productname}</h1>
        <p className="mb-1 text-gray-600"><span className="font-semibold">Product ID:</span> {product.productId}</p>
        <p className="mb-1 text-gray-600"><span className="font-semibold">Price: </span>{(product.price>product.lastprice)&&<span className="text-red-600 line-through">LKR. {product.price}</span>}<span>{" LKR."+ product.lastprice}</span></p>
        <p className="mb-1 text-gray-600"><span className="font-semibold">Stock:</span> {product.stock}</p>
        <p className="mb-1 text-gray-600"><span className="font-semibold">Description:</span> {product.description}</p>
      </div>
    </div>
  </div>
)}

        </div>
    );
}

