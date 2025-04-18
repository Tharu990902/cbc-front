/* eslint-disable no-unused-vars */

import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Uploadfile from "../../../utils/mediaUpload";


export default function AddProductform() {

   const [productId, setProductId] = useState("");
   const [productName, setProductName] = useState("");
    const [alternativeName, setAlternativeName] = useState("");
    const[imageurl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState([]);
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    const navigae = useNavigate();

     async function handleAddProduct() {

        const altname = alternativeName.split(",")
        const promisesArray = [];

        for(let i = 0; i < imageFile.length; i++){

            promisesArray[i] = Uploadfile(imageFile[i]);
        }

        const imageurl = await Promise.all(promisesArray)
        console.log(imageurl);

   
        const product = {
            productId: productId,
            productname: productName,
            alternames: altname,
            images: imageurl,
            price: price,
            lastprice: lastPrice,
            stock: stock,
            description: description
        }
        
        const token = localStorage.getItem("token")

        try {

             await axios.post("http://localhost:5000/api/product", product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          
            console.log("Product added successfully:", product);
           
            navigae("/admin/products");
            toast.success("Product added successfully!");
        }
    
        catch(error) {
            toast.error("Failed to add product. Please try again.");
        }
    }

    return (
        <div className="w-full h-screen">
            <div className="flex items-center justify-center ">   
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Add Product</h1>
            </div>
            <div className="flex items-center justify-center ">
            <div className=" h-[650px] w-[500px] bg-gray-400 flex items-center justify-center flex-col rounded-lg shadow-lg">
               

                <span>Product ID</span>
                <input type="text" value={productId} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
                    setProductId(e.target.value)
                }} />

                <span>Product Name</span>
                <input type="text" value={productName} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
                    setProductName(e.target.value)
                }} />

                <span>Alternative Name</span>
                <input type="text" value={alternativeName} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
                    setAlternativeName(e.target.value)
                }}/>

                <span>Image File</span>
                <input
                    type="file" className="w-[300px] h-10 mb-5 rounded-md" onChange={(e) => {
                        setImageFile(e.target.files);
                        }}
                        multiple
                        />


                <span>Price</span>
                <input type="number" value={price} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
                    setPrice(e.target.value)
                }}/>

                <span>Last Price</span>
                <input type="number" value ={lastPrice} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
                    setLastPrice(e.target.value)
                }} />

                <span>Stock</span>
                <input type="text" value={stock} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
                    setStock(e.target.value)
                }}/>

                <span>Description</span>
                <textarea className="w-[300px] h-10 mb-5 rounded-md" value={description} onChange={(e)=>{
                    setDescription(e.target.value)
                }}/>
                <button className="w-[200px] bg-blue-900 text-white rounded-[10px] mb-4" onClick={handleAddProduct}>Add Product</button>
                </div>
                </div>
            
            </div>
    )
}