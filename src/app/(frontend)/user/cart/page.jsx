'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

function CartPage() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch cart data
  async function fetchCart() {
    try {
      const response = await axios.get("/api/user/cart");
      if (response.data.succcess) {
        setCartData(response.data.data);
      }

      console.log('cartData', cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCart();
  }, []);

  // Delete product from cart
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete("/api/user/cart", {
        data: { productId },
      });
      if (response.data.succcess) {
        setCartData((prevData) => ({
          ...prevData,
          productId: prevData.productId.filter(
            (item) => item.productId._id !== productId
          ),
          // totalPrice: response.data.data.totalPrice,
        }));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle checkout button
  const handleCheckout = () => {
    alert("Proceeding to checkout...");
    // Add your checkout logic here
    router.push("/checkout");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cartData || cartData.productId.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartData.productId.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between mb-4 border-b pb-2"
          >
            <div className="flex items-center">
              <Image
                src={item.productId.productImages[0]}
                alt={item.productId.productName}
                width={80}
                height={80}
                className="rounded-md"
              />
              <div className="ml-4">
                <h2 className="text-lg font-medium">
                  {item.productId.productName}
                </h2>
                <p className="text-sm text-gray-600">
                  Price: ${item.productId.price} x {item.qty}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleDelete(item.productId._id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-semibold">Total: ${cartData.totalPrice}</h2>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
