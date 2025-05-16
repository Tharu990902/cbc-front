import { useEffect, useState } from "react";
import axios from "axios";
import OrderDetailModal from "../../components/orerdetailpopup.jsx";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return console.log("No token found");

      try {
        const res = await axios.get(`${import.meta.env.VITE_Backend_url}/api/order/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);
  
  
  

  return (

    
    <div className="w-full min-h-screen p-6 bg-[#FFF8F8]">
      <h2 className="mb-6 text-2xl font-semibold text-center">Your Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="items-center min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-pink-100">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total Price</th>
                
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t cursor-pointer hover:bg-pink-50"
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className="p-3">{order.orderID}</td>
                  <td className="p-3">{order.phoneNo}</td>
                  <td className="p-3 capitalize">{order.status}</td>
                  <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-3">
                    <ul className="text-sm list-disc list-inside">
                      {order.order_items.map((item, index) => (
                        <li key={index}>
                          {item.name} ({item.qty} x Rs.{item.price})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-3">
                    {order.order_items.reduce((acc, item) => acc + item.qty * item.price, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
