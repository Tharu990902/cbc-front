import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Adminproductpage() {
  const [products, setProducts] = useState([]);
  const [productloading, setproductLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(!productloading){
      axios.get(import.meta.env.VITE_Backend_url +"/api/product")
      .then((response) => {
        setProducts(response.data);
        setproductLoading(true);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  }, [productloading]);


  const handleDelete = (productId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(import.meta.env.VITE_Backend_url +`/api/product/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Product deleted successfully!");
        setproductLoading(false); 
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to delete product. Please try again.");
      });
  }
  
  return (
    <div className="relative min-h-screen p-6 bg-gray-100">
        <Link to= {"/admin/products/addProduct"} className="absolute right-[25px] bottom-[50px] text-[25px] bg-red-400 p-5 hover:bg-blue-400 rounded-[10px] "><FaPlus /></Link>
      <div className="p-6 mx-auto bg-white shadow-md max-w-7xl rounded-xl">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Admin Product Page</h1>
        <div className="flex flex-col items-center justify-center">
          {productloading ? <table className="w-full text-sm text-left border border-gray-300 table-auto">
            <thead>
              <tr className="text-gray-700 bg-gray-200">
                <th className="px-4 py-2 border">Product ID</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Last Price</th>
                <th className="px-4 py-2 border">Stock</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="transition duration-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-2 border">{product.productId}</td>
                  <td className="px-4 py-2 border">{product.productname}</td>
                  <td className="px-4 py-2 border">{product.price}</td>
                  <td className="px-4 py-2 border">{product.lastprice}</td>
                  <td className="px-4 py-2 border">{product.stock}</td>
                  <td className="px-4 py-2 border">{product.description}</td>
                  <td className="flex items-center px-4 py-5 space-x-4 border">
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(product.productId)}>
                      <FaTrash />
                    </button>
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => {
                      navigate("/admin/products/editProduct", { state: { product: product } });
                    }}>
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="py-4 text-center text-gray-500 border"
                  >
                    No products available.
                  </td>
                </tr>
              )}
            </tbody>
          </table> : <div className="w-[60px] h-[60px] border-gray-400 border-b-blue-800 border-[4px] rounded-full animate-spin " />}
          
          
        </div>
      </div>
    </div>
  );
}
