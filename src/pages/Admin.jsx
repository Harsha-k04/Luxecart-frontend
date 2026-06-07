import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Admin() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
    });

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: "",
    });

    const [editingId, setEditingId] = useState(null);

    const navigate = useNavigate();

    const fetchStats = async () => {
        try {
            const res = await API.get("/admin/stats");
            setStats(res.data);
        } catch {
            toast.error("Failed to load analytics");
        }
    };

    const refreshProducts = async () => {
        try {
            const res = await API.get("/products");
            setProducts(res.data);
        } catch {
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await refreshProducts();
            await fetchStats();
        };

        loadData();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            name: "",
            brand: "",
            price: "",
            category: "",
            stock: "",
            image: "",
            description: "",
        });

        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: form.name,
                brand: form.brand,
                price: Number(form.price),
                category: form.category,
                stock: Number(form.stock),
                description: form.description,
                images: [form.image],
            };

            if (editingId) {
                await API.put(
                    `/products/${editingId}`,
                    payload
                );

                toast.success("Product updated");
            } else {
                await API.post(
                    "/products",
                    payload
                );

                toast.success("Product added");
            }

            resetForm();

            await refreshProducts();
            await fetchStats();

        } catch (error) {
            console.error(error);
            toast.error("Operation failed");
        }
    };

    const editProduct = (product) => {
        setEditingId(product._id);

        setForm({
            name: product.name || "",
            brand: product.brand || "",
            price: product.price || "",
            category: product.category || "",
            stock: product.stock || "",
            image: product.images?.[0] || "",
            description: product.description || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const deleteProduct = async (id) => {
        const confirmed = window.confirm(
            "Delete this product?"
        );

        if (!confirmed) return;

        try {
            await API.delete(`/products/${id}`);

            toast.success("Product deleted");

            await refreshProducts();
            await fetchStats();

        } catch {
            toast.error("Delete failed");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-10">

            <h1 className="font-serif text-4xl mb-8">
                Admin Dashboard
            </h1>

            {/* Analytics Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-8">

                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-muted text-sm">
                        Products
                    </p>

                    <h2 className="text-3xl font-bold">
                        {stats.totalProducts}
                    </h2>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-muted text-sm">
                        Orders
                    </p>

                    <h2 className="text-3xl font-bold">
                        {stats.totalOrders}
                    </h2>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-muted text-sm">
                        Users
                    </p>

                    <h2 className="text-3xl font-bold">
                        {stats.totalUsers}
                    </h2>
                </div>

                <div className="bg-card border border-border rounded-xl p-5">
                    <p className="text-muted text-sm">
                        Revenue
                    </p>

                    <h2 className="text-3xl font-bold text-primary">
                        ₹{stats.totalRevenue}
                    </h2>
                </div>

            </div>

            <div className="mb-8">
                <button
                    onClick={() => navigate("/admin/orders")}
                    className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:scale-105 transition"
                >
                    View Orders
                </button>
            </div>

            {/* Add / Edit Product Form */}
            <div className="bg-card border border-border rounded-xl p-6 mb-10">

                <h2 className="text-2xl font-semibold mb-6">
                    {editingId
                        ? "Edit Product"
                        : "Add Product"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="p-3 rounded-lg bg-secondary border border-border"
                    />

                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={form.brand}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-secondary border border-border"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        className="p-3 rounded-lg bg-secondary border border-border"
                    />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-secondary border border-border"
                    />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-secondary border border-border"
                    />

                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-secondary border border-border"
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="md:col-span-2 p-3 rounded-lg bg-secondary border border-border"
                    />

                    <div className="flex gap-4 md:col-span-2">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-primary text-black rounded-lg font-semibold hover:scale-105 transition"
                        >
                            {editingId
                                ? "Update Product"
                                : "Add Product"}
                        </button>

                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-3 border border-border rounded-lg"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Product Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">

                <table className="w-full">

                    <thead className="border-b border-border">
                        <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Brand</th>
                            <th className="text-left p-4">Price</th>
                            <th className="text-left p-4">Stock</th>
                            <th className="text-left p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="border-b border-border"
                            >
                                <td className="p-4">
                                    {product.name}
                                </td>

                                <td className="p-4">
                                    {product.brand}
                                </td>

                                <td className="p-4">
                                    ₹{product.price}
                                </td>

                                <td className="p-4">
                                    {product.stock}
                                </td>

                                <td className="p-4 flex gap-4">

                                    <button
                                        onClick={() =>
                                            editProduct(product)
                                        }
                                        className="text-blue-400 hover:text-blue-300"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        className="text-red-500 hover:text-red-400"
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Admin;