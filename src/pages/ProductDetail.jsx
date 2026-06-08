import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/product-card";
import toast from "react-hot-toast";

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        API.get(`/products/${id}`).then((res) => {
            setProduct(res.data);
        });

        API.get(`/products/recommend/${id}`).then((res) => {
            setRecommendations(res.data);
        });

        const token = localStorage.getItem("token");

        if (token) {
            API.get("/users/wishlist", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => {
                    const exists = res.data.some(
                        (item) => item._id === id
                    );

                    setIsWishlisted(exists);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }, [id]);

    const addToCart = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login first");
                return;
            }

            await API.post(
                "/cart/add",
                {
                    productId: product._id,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Added to cart!");

        } catch (error) {
            console.error(error);
            toast.error("Error adding to cart");
        }
    };

    const toggleWishlist = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login first");
                return;
            }

            if (isWishlisted) {

                await API.delete(
                    `/users/wishlist/${product._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsWishlisted(false);
                toast.success("Removed from wishlist");

            } else {

                await API.post(
                    `/users/wishlist/${product._id}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setIsWishlisted(true);
                toast.success("Added to wishlist");
            }

        } catch (error) {
            console.error(error);
            toast.error("Wishlist update failed");
        }
    };

    // 🔥 Image mapping
    const imageMap = {
        "Rolex Submariner":
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
        "Omega Seamaster":
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        "Tag Heuer Carrera":
            "https://images.unsplash.com/photo-1609587312208-cea54be969e7",
    };

    if (!product)
        return (
            <div className="flex justify-center items-center h-40">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    const imageSrc =
        product.images?.[0]?.startsWith("http")
            ? product.images[0]
            : imageMap[product.name] ||
            "https://images.unsplash.com/photo-1547996160-81dfa63595aa";

    return (
        <div className="min-h-screen bg-background text-foreground animate-fadeIn px-6 md:px-10 py-10">

            {/* Back Link */}
            <p
                onClick={() => navigate("/")}
                className="text-muted mb-6 cursor-pointer hover:text-primary transition"
            >
                ← Back to Collection
            </p>

            {/* Product Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center">

                {/* Image */}
                <div className="bg-card rounded-xl overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-[450px] object-cover"
                    />
                </div>

                {/* Details */}
                <div>

                    <p className="text-sm uppercase tracking-widest text-primary mb-2">
                        {product.brand || "Luxury Watch"}
                    </p>

                    <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                        {product.name}
                    </h1>

                    <div className="mb-4">
                        <p className="text-2xl text-primary font-semibold">
                            ₹{product.price}
                        </p>

                        {product.stock > 10 && (
                            <p className="text-green-500 mt-2 font-medium">
                                ✓ In Stock ({product.stock} available)
                            </p>
                        )}

                        {product.stock > 0 && product.stock <= 10 && (
                            <p className="text-yellow-500 mt-2 font-medium">
                                ⚠ Only {product.stock} left
                            </p>
                        )}

                        {product.stock === 0 && (
                            <p className="text-red-500 mt-2 font-medium">
                                ✕ Out of Stock
                            </p>
                        )}
                    </div>

                    <p className="text-muted mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 mb-8">

                        <button
                            onClick={addToCart}
                            disabled={product.stock === 0}
                            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300
                            ${product.stock === 0
                                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                                    : "bg-primary text-black hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                                }`}
                        >
                            {product.stock === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                        </button>

                        <button
                            onClick={toggleWishlist}
                            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:scale-105
                            ${isWishlisted
                                    ? "bg-red-500 text-white"
                                    : "bg-primary text-black hover:shadow-lg hover:shadow-primary/30"
                                }`}
                        >
                            {isWishlisted
                                ? "♥ Wishlisted"
                                : "♡ Add to Wishlist"}
                        </button>
                        <button
                            onClick={() => {
                                let compare =
                                    JSON.parse(localStorage.getItem("compare")) || [];

                                const exists = compare.find(
                                    (item) => item._id === product._id
                                );

                                if (exists) {
                                    toast.error("Already added");
                                    return;
                                }

                                if (compare.length >= 2) {
                                    toast.error("Only 2 watches can be compared");
                                    return;
                                }

                                compare.push(product);

                                localStorage.setItem(
                                    "compare",
                                    JSON.stringify(compare)
                                );

                                toast.success("Added to Compare");
                            }}
                            className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-black transition"
                        >
                            Compare
                        </button>
                    </div>

                    {/* Features Row */}
                    <div className="flex flex-wrap gap-6 text-sm text-muted border-t border-border pt-6">
                        <span>✔ Authenticity Guaranteed</span>
                        <span>🚚 Free Shipping</span>
                        <span>↩ 14-Day Returns</span>
                    </div>

                </div>
            </div>

            {/* Recommended Products */}
            <section className="mt-20">
                <h2 className="font-serif text-2xl font-bold mb-8">
                    You May Also Like
                </h2>

                <div className="overflow-x-auto pb-4 -mx-6 px-6">
                    <div className="flex gap-6 min-w-max">
                        {recommendations.map((r) => (
                            <div
                                key={r._id}
                                className="w-72 flex-shrink-0"
                            >
                                <ProductCard product={r} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default ProductDetail;