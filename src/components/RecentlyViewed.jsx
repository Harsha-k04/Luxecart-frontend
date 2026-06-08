
import ProductCard from "./product-card";

function RecentlyViewed() {
    const products =
        JSON.parse(
            localStorage.getItem("recentlyViewed")
        ) || [];

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="px-6 md:px-10 py-12 border-t border-border">

            <h2 className="font-serif text-3xl mb-8">
                Recently Viewed
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}

            </div>

        </section>
    );
}

export default RecentlyViewed;