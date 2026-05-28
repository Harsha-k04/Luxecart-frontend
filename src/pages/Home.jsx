import { useEffect, useState } from "react";
import API from "../services/api";
import ProductCard from "../components/product-card";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        API.get("/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground animate-fadeIn">

            {/* Hero Section */}
            <section className="text-center py-20 px-6">

                <p className="text-primary uppercase tracking-widest text-sm mb-3">
                    Exclusive Collection
                </p>

                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    Discover Premium Watches
                </h1>

                <p className="text-muted max-w-2xl mx-auto mb-8 text-lg">
                    Curated luxury collection tailored for you. Experience the art of
                    timekeeping with world-renowned timepieces.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                        Explore Collection →
                    </button>

                    <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                        View Catalog
                    </button>
                </div>

            </section>
            <div className="flex justify-center gap-10 text-muted text-sm py-6 border-t border-border">
                <span>Rolex</span>
                <span>Patek Philippe</span>
                <span>Audemars Piguet</span>
                <span>Omega</span>
                <span>Cartier</span>
            </div>

            {/* Product Grid */}
            <section className="px-6 md:px-10 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((p) => (
                        <ProductCard key={p._id} product={p} />
                    ))}
                </div>
            </section>
            {/* ABOUT SECTION */}
            <section className="mt-24 bg-card border-t border-border">
                <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <p className="text-primary uppercase tracking-widest text-sm mb-3">
                            About LuxeCart
                        </p>

                        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                            Timeless Elegance, Modern Excellence
                        </h2>

                        <p className="text-muted mb-4 leading-relaxed">
                            At LuxeCart, we believe that a watch is more than just a timepiece—it's a statement of craftsmanship, heritage, and personal style.
                        </p>

                        <p className="text-muted leading-relaxed">
                            Every timepiece in our collection has been selected for its exceptional quality, timeless design, and investment value.
                        </p>
                    </div>

                    {/* RIGHT BOX */}
                    <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-xl flex items-center justify-center h-[300px]">
                        <div className="text-center">
                            <p className="text-5xl font-bold text-primary">15+</p>
                            <p className="text-muted mt-2">Years of Excellence</p>
                        </div>
                    </div>

                </div>
            </section>
            {/* CTA SECTION */}
            <section className="py-24 text-center border-t border-border">
                <div className="max-w-3xl mx-auto px-6">

                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
                        Ready to Find Your Perfect Timepiece?
                    </h2>

                    <p className="text-muted mb-10">
                        Browse our exclusive collection and discover the watch that speaks to your style.
                    </p>

                    <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                        Start Shopping →
                    </button>

                </div>
            </section>

        </div>
    );
}

export default Home;