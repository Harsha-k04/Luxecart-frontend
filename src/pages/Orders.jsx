import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await API.get("/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setOrders(res.data);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground px-6 md:px-10 py-10">

            <div className="max-w-6xl mx-auto">

                <h1 className="font-serif text-4xl mb-8">
                    Order History
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-card border border-border rounded-xl p-8 text-center">
                        <p className="text-muted">
                            You haven't placed any orders yet.
                        </p>

                        <button
                            onClick={() => navigate("/")}
                            className="mt-6 px-6 py-3 bg-primary text-black rounded-lg font-medium hover:scale-105 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-card border border-border rounded-xl p-6"
                            >

                                {/* Order Header */}
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

                                    <div>
                                        <p className="text-sm text-primary uppercase tracking-widest">
                                            Order
                                        </p>

                                        <h2 className="font-semibold">
                                            #{order._id.slice(-8)}
                                        </h2>

                                        <p className="text-muted text-sm mt-1">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm text-muted">
                                            Total
                                        </p>

                                        <p className="text-2xl font-bold text-primary">
                                            ₹{order.totalPrice}
                                        </p>
                                    </div>

                                </div>

                                {/* Products */}
                                <div className="space-y-4">

                                    {order.items.map((item, index) => (
                                        <div
                                            key={`${order._id}-${index}`}
                                            className="flex justify-between items-center border-t border-border pt-4"
                                        >

                                            <div>
                                                <p className="font-medium">
                                                    {item.product?.name}
                                                </p>

                                                <p className="text-sm text-muted">
                                                    Qty: {item.quantity}
                                                </p>
                                            </div>

                                            <div className="font-semibold">
                                                ₹
                                                {item.product?.price *
                                                    item.quantity}
                                            </div>

                                        </div>
                                    ))}

                                </div>

                                {/* Status */}
                                <div className="mt-6 flex justify-end">

                                    <span
                                        className={`px-4 py-2 rounded-full text-sm font-medium
    ${order.status === "Pending"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : order.status === "Processing"
                                                    ? "bg-blue-500/20 text-blue-400"
                                                    : order.status === "Shipped"
                                                        ? "bg-purple-500/20 text-purple-400"
                                                        : "bg-green-500/20 text-green-400"
                                            }`}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Orders;