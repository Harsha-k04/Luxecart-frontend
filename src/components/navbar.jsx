import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LogOut,
  Package,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function Navbar({ cartItemCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();



  const handleProfileClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    toast.success("Logged out");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer"
          >
            <span className="text-2xl font-bold text-[#c9a86a] font-serif">
              LuxeCart
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition">
              Home
            </Link>
            <a href="#collection" className="text-sm text-gray-400 hover:text-white transition">
              Collection
            </a>
            <a href="#about" className="text-sm text-gray-400 hover:text-white transition">
              About
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <div
              onClick={() => navigate("/cart")}
              className="relative p-2 text-gray-400 hover:text-white cursor-pointer transition"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a86a] text-xs text-black font-medium">
                  {cartItemCount}
                </span>
              )}
            </div>

            {/* Profile */}
            <div className="relative">

              {!isLoggedIn ? (
                <div className="hidden md:flex items-center gap-4">

                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 bg-primary text-black rounded-lg font-medium hover:scale-105 transition"
                  >
                    Register
                  </button>

                </div>
              ) : (
                <>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-black font-bold"
                  >
                    {user?.name
                      ? user.name[0].toUpperCase()
                      : "U"}
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary text-left"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>

                      <button
                        onClick={() => {
                          navigate("/orders");
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary text-left"
                      >
                        <Package className="h-4 w-4" />
                        Orders
                      </button>
                      <button
                        onClick={() => {
                          navigate("/wishlist");
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary text-left"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </button>
                      {user?.role === "admin" && (
                        <button
                          onClick={() => {
                            navigate("/admin");
                            setProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary text-left"
                        >
                          Admin Dashboard
                        </button>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary text-left text-red-400"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>

                    </div>
                  )}
                </>
              )}

            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-400 hover:text-white transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">

              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              <a
                href="#collection"
                className="text-sm text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Collection
              </a>

              <a
                href="#about"
                className="text-sm text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>

              {/* Profile */}
              <button
                onClick={() => {
                  handleProfileClick();
                  setMobileMenuOpen(false);
                }}
                className="text-sm text-gray-400 hover:text-white text-left"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  navigate("/wishlist");
                  setMobileMenuOpen(false);
                }}
                className="text-sm text-gray-400 hover:text-white text-left"
              >
                Wishlist
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => {
                    navigate("/admin");
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm text-gray-400 hover:text-white text-left"
                >
                  Admin Dashboard
                </button>
              )}
              {/* Logout */}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm text-red-400 hover:text-red-300 text-left"
                >
                  Logout
                </button>
              )}

            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;