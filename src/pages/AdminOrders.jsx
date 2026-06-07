import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get("/orders/admin");
                setOrders(res.data);
            } catch {
                toast.error("Failed to load orders");
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-10">

            <h1 className="font-serif text-4xl mb-8">
                All Orders
            </h1>

            <div className="space-y-6">

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="bg-card border border-border rounded-xl p-6"
                    >
                        <div className="flex justify-between mb-4">

                            <div>
                                <h2 className="font-semibold">
                                    {order.user?.name}
                                </h2>

                                <p className="text-sm text-muted">
                                    {order.user?.email}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-primary font-bold">
                                    ₹{order.totalPrice}
                                </p>

                                <p className="text-sm text-muted">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>

                        </div>

                        {order.items.map((item, index) => (
                            <div
                                key={index}
                                className="border-t border-border pt-3 mt-3 flex justify-between"
                            >
                                <span>
                                    {item.product?.name}
                                </span>

                                <span>
                                    Qty: {item.quantity}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}

            </div>

        </div>
    );
}

export default AdminOrders;