import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Cart() {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Please login first");
          return;
        }

        const res = await API.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCart(res.data);
      } catch {
        toast.error("Failed to load cart");
      }
    };

    fetchCart();
  }, []);

  // ✅ SAFE TOTAL CALCULATION
  const total = cart.items.reduce((acc, item) => {
    const price = Number(item.product?.price || 0);
    const qty = Number(item.quantity || 0);
    return acc + price * qty;
  }, 0);

  // ✅ TOTAL ITEM COUNT (not just length)
  const totalItems = cart.items.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const loading = toast.loading("Placing order...");

      await API.post(
        "/orders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.dismiss(loading);
      toast.success("Order placed successfully!");

      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast.error("Order failed");
    }
  };

  const updateQuantity = async (productId, newQty) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        "/cart/update",
        { productId, quantity: newQty },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(res.data);
    } catch {
      toast.error("Update failed");
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(res.data);
      toast.success("Item removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 md:px-10 py-10">
      <h1 className="font-serif text-4xl mb-10">Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-muted">Your cart is empty</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="md:col-span-2 space-y-6">
            {cart.items.map((item) => {
              const price = Number(item.product?.price || 0);
              const qty = Number(item.quantity || 0);

              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-card border border-border rounded-xl p-6 hover:shadow-xl transition"
                >
                  <div className="flex gap-6 items-center">
                    {/* IMAGE */}
                    <img
                      src={
                        item.product?.images?.[0] ||
                        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49"
                      }
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    {/* DETAILS */}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-primary">
                        {item.product?.brand || "Luxury"}
                      </p>

                      <h3 className="font-serif text-lg">
                        {item.product?.name || "Product"}
                      </h3>

                      {/* QUANTITY */}
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() =>
                            qty > 1 &&
                            updateQuantity(item.product._id, qty - 1)
                          }
                          className="px-3 py-1 bg-secondary rounded-md hover:bg-primary/20"
                        >
                          -
                        </button>

                        <span>{qty}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.product._id, qty + 1)
                          }
                          className="px-3 py-1 bg-secondary rounded-md hover:bg-primary/20"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product._id)}
                        className="text-red-400 text-sm mt-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* PRICE */}
                  <p className="text-lg font-semibold">
                    ₹{price * qty}
                  </p>
                </div>
              );
            })}
          </div>

          {/* RIGHT */}
          <div className="bg-card border border-border rounded-xl p-6 h-fit">
            <h2 className="font-serif text-xl mb-6">Order Summary</h2>

            <div className="space-y-4 text-muted">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{total}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-primary">Free</span>
              </div>
            </div>

            <div className="border-t border-border my-6"></div>

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              onClick={placeOrder}
              className="w-full py-3 bg-primary text-black rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              Place Order
            </button>

            <p className="text-xs text-muted mt-4 text-center">
              Secure checkout with 256-bit SSL encryption
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;