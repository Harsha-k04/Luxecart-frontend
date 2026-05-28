import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await API.get("/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUser(res.data);
            } catch (err) {
                toast.error("Session expired");
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchUser();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out");
        navigate("/");
    };

    if (!user) return <p className="p-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-background text-foreground px-6 py-10">

            <div className="max-w-xl mx-auto bg-card border border-border rounded-xl p-8 shadow-lg">

                <h1 className="font-serif text-3xl mb-6">Your Profile</h1>

                <div className="space-y-4">
                    <p><span className="text-muted">Name:</span> {user.name}</p>
                    <p><span className="text-muted">Email:</span> {user.email}</p>
                </div>

                <button
                    onClick={logout}
                    className="mt-8 px-6 py-3 bg-primary text-black rounded-lg hover:scale-105 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;