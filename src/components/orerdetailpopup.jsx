// OrderDetailModal.tsx
import React from "react";

export default function OrderDetailModal({ order, onClose }) {
  if (!order) return null;

  const total = order.order_items.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl p-6 bg-white rounded-lg">
        <button onClick={onClose} className="absolute text-lg font-bold top-2 right-2">
          &times;
        </button>
        <h3 className="mb-4 text-xl font-bold">Order Details: {order.orderID}</h3>
        <p><strong>Name:</strong> {order.Name}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
        <p><strong>Address:</strong> {order.address}, {order.city}, {order.province}</p>
        <ul className="mt-4 space-y-1 text-sm list-disc list-inside">
          {order.order_items.map((item, idx) => (
            <li key={idx}>
              {item.name} - {item.qty} × Rs.{item.price} = Rs.{item.qty * item.price}
            </li>
          ))}
        </ul>
        <p className="mt-4 font-semibold">Total: Rs.{total.toFixed(2)}</p>
      </div>
    </div>
  );
}
