import { Link } from "react-router-dom";

export default function Header(){
    return (
        <div className="relative flex items-center justify-center w-full h-20 bg-white ">
            <img src="../../public/logo.jpg" alt="Logo" className="w-[80px] mb-3 mt-3 left-[30px] rounded-full h-[80px] cursor-pointer absolute" />
            <div className=" flex items-center w-[500px] h-full justify-between">
            <Link to={"/"} className= "text-[#1b2d7f] text-xl font-extrabold  hover:border-b-2 border-b-primary">Home</Link>
            <Link to={"/products"} className= "text-[#1b2d7f] text-xl font-extrabold  hover:border-b-2 border-b-primary">Products</Link>
            <Link to={"/about"} className= "text-[#1b2d7f] text-xl font-extrabold hover:border-b-2 border-b-primary ">About</Link>
            <Link to={"/contact"} className= "text-[#1b2d7f] text-xl font-extrabold hover:border-b-2 border-b-primary">Contact</Link>
            </div>
        </div>
    )
}


