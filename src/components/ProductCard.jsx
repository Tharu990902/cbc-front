import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ productId, productname, images, price, lastPrice }) {
  const hasDiscount = lastPrice && lastPrice < price;

  return (
    <Link
      to={`/productinfo/${productId}`}
      className="w-[300px] bg-slate-300 m-3 mt-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      {/* Image */}
      <div className="w-full h-[220px] overflow-hidden">
        <img
          src={images[0]}
          alt={productname}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{productname}</h2>
        <div className="text-gray-700">
          {hasDiscount ? (
            <>
              <span className="mr-2 text-sm text-red-500 line-through">LKR. {price}</span>
              <span className="text-base font-bold text-green-600">LKR. {lastPrice}</span>
            </>
          ) : (
            <span className="text-base font-bold">LKR. {price}</span>
          )}
        </div>
        <button className="w-full py-2 mt-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
          View Details
        </button>
      </div>
    </Link>
  );
}

