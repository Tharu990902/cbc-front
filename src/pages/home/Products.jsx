/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard.jsx";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [status, setStatus] = useState("loading");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if (status === "loading") {
            axios.get("http://localhost:5000/api/product")
                .then((res) => {
                    setProducts(res.data);
                    setStatus("loaded");
                    setLoading(true);
                })
                .catch((err) => {
                    console.log(err);
                    setStatus("not found");
                });
        }
    }, [loading]);


    function search(e) {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
        // Reload all products if search is empty
        axios.get("http://localhost:5000/api/product")
            .then((res) => {
                setProducts(res.data);
                setStatus("loaded");
                setLoading(true);
            })
            .catch((err) => {
                console.log(err);
                setStatus("not found");
            });
    } else {
        // Search using backend API
        axios.get(`http://localhost:5000/api/product/search/${(query)}`)
            .then((res) => {
                setProducts(res.data);
                setStatus("loaded");
                setLoading(true);
            })
            .catch((err) => {
                console.log(err);
                setStatus("not found");
            });
    }
}

    return (
        <div>
            <div className="flex items-center justify-center w-full p-4 bg-white shadow">
                <input
                    type="text"
                    placeholder="Search by product name..."
                    value={searchQuery}
                    onChange={search}
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
            </div>

            <div className="w-full h-[calc(100vh-80px)] bg-[#FFF8F8] overflow-y-scroll flex flex-wrap items-start justify-center">
                {
                    products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            productId={product.productId}
                            productname={product.productname}
                            price={product.price}
                            lastPrice={product.lastPrice}
                            images={product.images}
                        />
                    ))
                }
            </div>
        </div>
    );
}
