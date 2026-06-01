import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const [userRes, orderRes] = await Promise.all([
                    API.get("/users/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    API.get("/orders", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                setUser(userRes.data);
                setOrders(orderRes.data);

            } catch {
                toast.error("Session expired");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out");
        navigate("/");
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const initials = user.name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();

    return (
        <div className="min-h-screen bg-background text-foreground px-6 py-10">

            <div className="max-w-5xl mx-auto">

                {/* HEADER CARD */}
                <div className="bg-card border border-border rounded-2xl p-8 mb-8">

                    <div className="flex flex-col md:flex-row md:items-center gap-6">

                        {/* AVATAR */}
                        <div className="w-24 h-24 rounded-full bg-primary text-black flex items-center justify-center text-3xl font-bold">
                            {initials}
                        </div>

                        {/* INFO */}
                        <div className="flex-1">
                            <h1 className="font-serif text-4xl mb-2">
                                {user.name}
                            </h1>

                            <p className="text-muted">
                                {user.email}
                            </p>

                            <div className="flex flex-wrap gap-4 mt-4">

                                <span className="bg-secondary px-4 py-2 rounded-lg text-sm">
                                    Role: {user.role}
                                </span>

                                <span className="bg-secondary px-4 py-2 rounded-lg text-sm">
                                    Orders: {orders.length}
                                </span>

                                <span className="bg-secondary px-4 py-2 rounded-lg text-sm">
                                    Member Since:{" "}
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </span>

                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="px-6 py-3 bg-primary text-black rounded-lg hover:scale-105 transition"
                        >
                            Logout
                        </button>

                    </div>

                </div>

                {/* RECENT ORDERS */}
                <div className="bg-card border border-border rounded-2xl p-8">

                    <h2 className="font-serif text-2xl mb-6">
                        Recent Orders
                    </h2>

                    {orders.length === 0 ? (
                        <p className="text-muted">
                            No orders yet.
                        </p>
                    ) : (
                        <div className="space-y-4">

                            {orders.slice(0, 5).map((order) => (
                                <div
                                    key={order._id}
                                    className="border border-border rounded-xl p-4"
                                >
                                    <div className="flex justify-between items-center">

                                        <div>
                                            <p className="font-semibold">
                                                Order #{order._id.slice(-6)}
                                            </p>

                                            <p className="text-sm text-muted">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ₹{order.totalPrice}
                                            </p>

                                            <p className="text-primary text-sm">
                                                Completed
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default Profile;