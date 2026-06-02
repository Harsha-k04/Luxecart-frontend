import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/product-card";
import toast from "react-hot-toast";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await API.get("/users/wishlist", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setWishlist(res.data);

            } catch (error) {
                console.error(error);
                toast.error("Failed to load wishlist");
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading wishlist...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground px-6 md:px-10 py-10">

            <h1 className="font-serif text-4xl mb-8">
                Your Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                    <p className="text-muted">
                        Your wishlist is empty.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 px-6 py-3 bg-primary text-black rounded-lg font-medium hover:scale-105 transition"
                    >
                        Browse Collection
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Wishlist;