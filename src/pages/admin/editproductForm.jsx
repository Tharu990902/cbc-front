/* eslint-disable no-unused-vars */
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Uploadfile from "../../../utils/mediaUpload";

export default function EditProductForm() {
    const navigate = useNavigate();
    const location = useLocation(); // get json file

    const product = location.state.product; // get product from location state

    if(product == null){
        toast.error("Product not found!");
        navigate("/admin/products")
    }
       
    const [productId, setProductId] = useState(product.productId);
   const [productName, setProductName] = useState(product.productname);
    const [alternativeName, setAlternativeName] = useState(product.alternames.join(","));
    const [imageFile, setImageFile] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastprice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);

    console.log(location);

    async function handleAddProduct() {

        const altname = alternativeName.split(",")
        const promisesArray = [];
        let imageurl = product.images;

        for(let i = 0; i < imageFile.length; i++){

            promisesArray[i] = Uploadfile(imageFile[i]);
        }

         imageurl = await Promise.all(promisesArray)
        console.log(imageurl);

   
        const productData = {
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

             await axios.put(import.meta.env.VITE_Backend_url +`/api/product/${product.productId}` , productData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
          
            console.log("Product Updated successfully:", product);
           
            navigate("/admin/products");
            toast.success("Product Updated successfully!");
        }
    
        catch(error) {
            toast.error("Failed to Update product. Please try again.");
        }
    }


    return (
        <div className="w-full h-screen">
            <div className="flex items-center justify-center ">   
            <h1 className="mb-6 text-2xl font-bold text-gray-800">Edit Product</h1>
            </div>
            <div className="flex items-center justify-center ">
            <div className=" h-[650px] w-[500px] bg-gray-400 flex items-center justify-center flex-col rounded-lg shadow-lg">
               

                <span>Product ID</span>
                <input disabled type="text" value={productId} className="w-[300px] h-10 mb-5 rounded-md" onChange={(e)=>{
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
                <button className="w-[200px] bg-blue-900 text-white rounded-[10px] mb-4" onClick={handleAddProduct}  >Edit Product</button>
                </div>
                </div>
            
            </div>
    )
}