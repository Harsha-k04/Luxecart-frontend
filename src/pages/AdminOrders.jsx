import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await API.get("/orders/admin");
                setOrders(res.data);
            } catch {
                toast.error("Failed to load orders");
            }
        };

        loadOrders();
    }, []);
    const updateStatus = async (orderId, status) => {
        try {
            await API.put(`/orders/admin/${orderId}`, {
                status,
            });

            toast.success("Order status updated");

            const res = await API.get("/orders/admin");
            setOrders(res.data);

        } catch {
            toast.error("Update failed");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-400";

            case "Processing":
                return "text-blue-400";

            case "Shipped":
                return "text-purple-400";

            case "Delivered":
                return "text-green-400";

            default:
                return "text-gray-400";
        }
    };

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
                        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">

                            <div>
                                <h2 className="font-semibold">
                                    {order.user?.name}
                                </h2>

                                <p className="text-sm text-muted">
                                    {order.user?.email}
                                </p>

                                <p className="text-xs text-muted mt-2">
                                    Order ID: #{order._id.slice(-8)}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-primary font-bold text-xl">
                                    ₹{order.totalPrice}
                                </p>

                                <p className="text-sm text-muted">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>

                                <p
                                    className={`font-semibold mt-2 ${getStatusColor(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </p>
                            </div>

                        </div>

                        <div className="space-y-3">

                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="border-t border-border pt-3 flex justify-between"
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

                        <div className="mt-6">

                            <label className="block text-sm mb-2">
                                Update Status
                            </label>

                            <select
                                value={order.status}
                                onChange={(e) =>
                                    updateStatus(
                                        order._id,
                                        e.target.value
                                    )
                                }
                                className="bg-secondary border border-border rounded-lg px-4 py-2"
                            >
                                <option value="Pending">
                                    Pending
                                </option>

                                <option value="Processing">
                                    Processing
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>
                            </select>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}

export default AdminOrders;