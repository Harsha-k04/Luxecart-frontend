import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Compare() {
    const navigate = useNavigate();

    const [products, setProducts] = useState(() => {
        return JSON.parse(localStorage.getItem("compare")) || [];
    });

    const clearCompare = () => {
        localStorage.removeItem("compare");
        setProducts([]);
    };

    if (products.length < 2) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">
                    Compare Watches
                </h1>

                <p className="text-muted mb-6">
                    Select 2 watches to compare.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-primary text-black rounded-lg"
                >
                    Browse Watches
                </button>
            </div>
        );
    }

    const left = products[0];
    const right = products[1];

    return (
        <div className="min-h-screen bg-background text-foreground px-6 py-10">

            <h1 className="font-serif text-4xl mb-10">
                Watch Comparison
            </h1>

            <div className="overflow-x-auto">

                <table className="w-full border border-border">

                    <tbody>

                        <tr className="border-b border-border">
                            <td className="p-4 font-bold">
                                Feature
                            </td>
                            <td className="p-4 font-bold">
                                {left.name}
                            </td>
                            <td className="p-4 font-bold">
                                {right.name}
                            </td>
                        </tr>

                        <tr className="border-b border-border">
                            <td className="p-4">
                                Brand
                            </td>
                            <td className="p-4">
                                {left.brand}
                            </td>
                            <td className="p-4">
                                {right.brand}
                            </td>
                        </tr>

                        <tr className="border-b border-border">
                            <td className="p-4">
                                Price
                            </td>
                            <td className="p-4">
                                ₹{left.price}
                            </td>
                            <td className="p-4">
                                ₹{right.price}
                            </td>
                        </tr>

                        <tr className="border-b border-border">
                            <td className="p-4">
                                Category
                            </td>
                            <td className="p-4">
                                {left.category}
                            </td>
                            <td className="p-4">
                                {right.category}
                            </td>
                        </tr>

                        <tr className="border-b border-border">
                            <td className="p-4">
                                Stock
                            </td>
                            <td className="p-4">
                                {left.stock}
                            </td>
                            <td className="p-4">
                                {right.stock}
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

            <div className="mt-8 flex gap-4">

                <button
                    onClick={clearCompare}
                    className="px-6 py-3 bg-red-500 rounded-lg"
                >
                    Clear Comparison
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-primary text-black rounded-lg"
                >
                    Continue Shopping
                </button>

            </div>

        </div>
    );
}

export default Compare;