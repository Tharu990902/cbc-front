/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageSlider from "../../components/imageslider";
import { Addtocart } from "../../../utils/cardfunction";
import toast from "react-hot-toast";

export default function Productinfo() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/product/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setStatus(res.data ? "found" : "not found");
      })
      .catch(() => setStatus("not found"));
  }, []);

  function onAddToCart() {
    Addtocart(product.productId, 1);
    toast.success("Added to cart");
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-gray-50 overflow-y-auto">
      {/* Loading State */}
      {status === "loading" && (
        <div className="flex items-center justify-center h-full">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}

      {/* Not Found State */}
      {status === "not found" && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="mb-2 text-2xl font-bold text-red-600">Product Not Found</h1>
          <p className="text-gray-500">We couldn’t find the product you’re looking for.</p>
        </div>
      )}

      {/* Found State */}
      {status === "found" && product && (
        <div className="flex flex-col items-center justify-center min-h-full p-4">
          <div className="flex flex-col w-full max-w-5xl p-6 bg-white shadow-lg rounded-3xl md:flex-row">
            {/* Image Section */}
            <div className="flex justify-center w-full md:w-1/2">
              <div className="w-[280px] sm:w-[300px] md:w-[350px]">
                <ImageSlider images={product.images} />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col w-full mt-6 md:mt-0 md:w-1/2 md:pl-10">
              {/* Product Title */}
              <h1 className="mb-4 text-3xl font-bold text-gray-800">{product.productname}</h1>

              {/* Product Details */}
              <div className="space-y-3 text-gray-600">
                <p><span className="font-semibold text-gray-700">Product ID:</span> {product.productId}</p>
                <p>
                  <span className="font-semibold text-gray-700">Price:</span>{" "}
                  {product.price > product.lastprice && (
                    <span className="mr-2 text-red-500 line-through">LKR {product.price}</span>
                  )}
                  <span className="font-bold text-green-600">LKR {product.lastprice}</span>
                </p>
                <p><span className="font-semibold text-gray-700">Stock:</span> {product.stock > 0 ? product.stock : <span className="text-red-500">Out of Stock</span>}</p>
                <p className="leading-relaxed">
                  <span className="font-semibold text-gray-700">Description:</span> {product.description}
                </p>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6">
                <button
                  onClick={onAddToCart}
                  className="w-full px-6 py-3 text-white transition-all duration-300 bg-blue-600 rounded-full shadow-md md:w-auto hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        
      )}
    </div>
  );
}
