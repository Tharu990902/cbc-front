/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Route , Routes} from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers, FaCog, FaChartBar } from "react-icons/fa";
import Adminproductpage from "./admin/adminproductpage";
import AddProductform from "./admin/addProductform.jsx";
import EditProductForm from "./admin/editproductForm.jsx";
import OrderPage from "./home/order.jsx";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Adminhomepage() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
             navigate("/login");
             return;
        }
        axios.get("http://localhost:5000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            console.log(res.data);
            if(res.data.type !== "admin"){
                toast.error("You are not authorized to access this page");
                navigate("/login");
                return;
            }
            setUser(res.data);
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to fetch user data");
        })
       
    },[]);

    return (
        <div className="flex w-full h-screen bg-blue-100">
            {/* Sidebar */}
            <div className="bg-blue-800 w-[20%] h-full flex flex-col py-8 px-4 text-white shadow-lg">
                <h1 className="mb-10 text-2xl font-bold text-center">Admin Panel</h1>
                
                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-3 p-4 transition duration-200 rounded-lg hover:bg-blue-700"
                >
                    <GoGraph className="text-xl" />
                    <span>Dashboard</span>
                </Link>

                <Link
                    to="/admin/products"
                    className="flex items-center gap-3 p-4 transition duration-200 rounded-lg hover:bg-blue-700"
                >
                    <FaUsers className="text-xl" />
                    <span>Products</span>
                </Link>

                <Link
                    to="/admin/settings"
                    className="flex items-center gap-3 p-4 transition duration-200 rounded-lg hover:bg-blue-700"
                >
                    <FaCog className="text-xl" />
                    <span>Settings</span>
                </Link>

                <Link
                    to="/admin/reports"
                    className="flex items-center gap-3 p-4 transition duration-200 rounded-lg hover:bg-blue-700"
                >
                    <FaChartBar className="text-xl" />
                    <span>Reports</span>
                </Link>

                <Link
                    to="/admin/orders"
                    className="flex items-center gap-3 p-4 transition duration-200 rounded-lg hover:bg-blue-700"        
                >
                    <FaChartBar className="text-xl" />
                    <span>Orders</span>                 
            </Link>  
            </div>

            {/* Main Content Area */}
            <div className="bg-white w-[80%] h-full p-10 overflow-auto">
                {user != null
                 &&< Routes path="/*">  
                    
                    <Route path="/products" element={<Adminproductpage />} />
                    <Route path="products/addProduct" element={<AddProductform />} />
                    <Route path="/products/editProduct" element={<EditProductForm />} />
                    <Route path="/settings" element={<h1>Settings</h1>} />
                    <Route path="/reports" element={<h1>Reports</h1>} />
                    <Route path="/orders" element={<OrderPage />} />
                </Routes>  }
                {
                    user == null && <div className="flex items-center justify-center w-full h-full">
                        <div className="w-32 h-32 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>

                        </div>
                }
            </div>
        </div>
    );
}
