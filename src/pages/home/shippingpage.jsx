import { useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cart from './card'
import toast from "react-hot-toast";

export default function Shippingpage() {
  const location = useLocation();
  
 

  const { order_items, Total, labeldTotal } = location.state || {};
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("user_email");

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    province: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    if (!formData.name  || !formData.address || !formData.phone || !formData.city || !formData.province) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      
    await axios.post("http://localhost:5000/api/order", {
        
        order_items,
        Total,
        labeldTotal,
        shippingAddress: { ...formData },
        email: email,
      },
     {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );

      toast.success("Order placed successfully!");
      
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#fefefe] p-8">
      <h1 className="mb-4 text-3xl font-bold">Shipping Page</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Form */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Shipping Information</h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <textarea
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select Province</option>
              <option value="Western">Western</option>
              <option value="Central">Central</option>
              <option value="Southern">Southern</option>
              <option value="Uva">Uva</option>
              <option value="Sabaragamuwa">Sabaragamuwa</option>
            </select>
          </div>

          {error && <p className="mt-4 text-red-500">{error}</p>}

          <button
            onClick={handlePlaceOrder}
            className="px-6 py-2 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>

        {/* Order Summary */}
        <div className="p-6 bg-gray-100 shadow-md rounded-xl">
          <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
            <Cart />
        </div>
      </div>
    </div>
  );
}
