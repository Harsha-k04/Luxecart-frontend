import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  // 🔥 Premium image mapping
  const imageMap = {
    "Rolex Submariner":
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
    "Omega Seamaster":
      "https://images.unsplash.com/photo-1594534475808-b18fc33b045e",
    "Tag Heuer Carrera":
      "https://images.unsplash.com/photo-1609587312208-cea54be969e7",
  };

  const imageSrc =
    product.images?.[0]?.startsWith("http")
      ? product.images[0]
      : imageMap[product.name] ||
      "https://images.unsplash.com/photo-1548171915-e1c3c1d1d9f0";

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)}
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
    >
      <article className="overflow-hidden rounded-xl bg-card border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:border-primary">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          {product.brand && (
            <p className="text-xs uppercase tracking-widest text-primary mb-1">
              {product.brand}
            </p>
          )}

          <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition line-clamp-1">
            {product.name}
          </h3>

          <p className="mt-2 text-lg font-semibold text-muted">
            {formattedPrice}
          </p>
        </div>
      </article>
    </div>
  );
}

export default ProductCard;