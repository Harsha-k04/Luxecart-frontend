import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/product-card";
import toast from "react-hot-toast";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        API.get(`/products/${id}`).then((res) => {
            setProduct(res.data);
        });

        API.get(`/products/recommend/${id}`).then((res) => {
            setRecommendations(res.data);
        });
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

    // 🔥 Image mapping (fix same image issue)
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
            <p className="text-muted mb-6 cursor-pointer hover:text-primary transition">
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

                    <p className="text-2xl text-primary font-semibold mb-4">
                        ₹{product.price}
                    </p>

                    <p className="text-muted mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-4 mb-8">
                        <button
                            onClick={addToCart}
                            className="px-6 py-3 bg-primary text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                        >
                            Add to Cart
                        </button>

                        <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                            Add to Wishlist
                        </button>
                    </div>

                    {/* Features Row (v0 style) */}
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
                            <div key={r._id} className="w-72 flex-shrink-0">
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