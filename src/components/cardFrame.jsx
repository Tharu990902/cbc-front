/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import axios from "axios";
import { Addtocart, Deletecart, Loadcard } from "../../utils/cardfunction";

export default function CartFrame({ productId, qty: initialQty }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(initialQty);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      axios.get(`http://localhost:5000/api/product/${productId}`).then((res) => {
        if (res.data != null) {
          setProduct(res.data);
          setLoading(true);
        } else {
          Deletecart(productId);
          setLoading(false);
        }
      });
    }
  }, [productId]);

  const handleQuantityChange = (amount) => {
    const newQty = qty + amount;
    if (newQty <= 0) {
      Deletecart(productId);
      setLoading(false);
    } else {
      Addtocart(productId, amount);
      setQty(newQty);
    }
  };

  const handleDelete = () => {
    Deletecart(productId);
    setLoading(false);
  };

  if (!loading) return null; //  This hides the component after deletion

  return (
    <div className="flex items-center justify-between w-full max-w-4xl gap-4 p-4 mb-4 bg-white border shadow-md rounded-2xl hover:bg-red-400">
      <img
        src={product?.images?.[0]}
        alt={product?.productname}
        className="object-cover w-24 h-24 rounded-xl"
      />
      <div className="flex flex-col flex-grow px-2">
        <span className="text-lg font-semibold text-gray-800">{product?.productname}</span>
        <span className="text-sm text-gray-500">ID: {productId}</span>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-2">{qty}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <button
          onClick={handleDelete}
          className="mt-2 text-xs text-red-700 bg-red-300 hover:underline w-[50px] items-center justify-end"
        >
          Remove
        </button>
      </div>
      <div className="text-right">
        <span className="block text-sm text-gray-600">
          Unit Price: Rs. {product?.lastprice?.toLocaleString()}
        </span>
        <span className="block font-bold text-blue-600">
          Total: Rs. {(product?.lastprice * qty)?.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
