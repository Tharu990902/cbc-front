import { Link, Route , Routes} from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { FaUsers, FaCog, FaChartBar } from "react-icons/fa";
import Adminproductpage from "./admin/adminproductpage";
import AddProductform from "./admin/addProductform.jsx";

export default function Adminhomepage() {
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
            </div>

            {/* Main Content Area */}
            <div className="bg-white w-[80%] h-full p-10 overflow-auto">
                <Routes path="/*">  
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                    <Route path="/products" element={<Adminproductpage />} />
                    <Route path="products/addProduct" element={<AddProductform />} />
                    <Route path="/settings" element={<h1>Settings</h1>} />
                    <Route path="/reports" element={<h1>Reports</h1>} />
                </Routes>  
            </div>
        </div>
    );
}
