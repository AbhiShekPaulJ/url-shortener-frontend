import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://url-shortener-backend-nqi0.onrender.com/api/auth/check-auth", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log("CheckAuth response:", data);

        if (res.ok && data.authenticated) {
          setIsLoggedIn(true);
          setUserName(data.user?.name || "User");
        } else {
          setIsLoggedIn(false);
          setUserName("");
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
    window.addEventListener("login-success", checkAuth);

    return () => {
      window.removeEventListener("login-success", checkAuth);
    };
  }, []);

  const onLogout = async () => {
    try {
      const res = await fetch("https://url-shortener-backend-nqi0.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        setUserName("");
        navigate({ to: "/" });
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-transparent text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16  lg:px-10">
          <div className="flex items-center">
            <Link  to="/" className="text-2xl flex items-center gap-3 sm:text-xl font-bold">
              <img src="/icons8-shorten-urls.svg" alt="" />
              Free Custom URL Shortener
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn &&  (
              <Link to="/dashboard">
                <div className="flex items-center cursor-pointer font-extrabold p-5">
                  <MdDashboard />
                  Dashboard
                </div>
              </Link>
            )}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="font-light">Welcome, {userName}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-600 transition-all duration-200 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login / Signup
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
