import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../axios"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/auth/me");

        if (res.data.success && isMounted) {
          console.log("auth/me >>>", res.data.success)
          setUser(res.data.data); // { email, role }
        } else if (isMounted) {
          setUser(null);
        }
      } catch (err) {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false; // Cleanup to avoid setting state on unmounted component
    };
  }, []); // Empty dependency array to run only once on mount

  const login = async (credentials, navigate) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensure cookies are sent
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Login failed");
        return;
      }

      // Assume backend returns user data in res.data.data
      setUser(res.data.data || null);
      toast.success(res.data.message || "Login successful");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || "Login failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const superAdminLogin = async (credentials, navigate) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/superadmin-login", credentials, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensure cookies are sent
      });

      if (res.data.status !== "success") {
        toast.error(res.data.message || "Login failed");
        return;
      }

      // Assume backend returns user data in res.data.data
      setUser(res.data.data || null);
      toast.success(res.data.message || "Login successful");
      navigate("/setup");
    } catch (error) {
      console.error("Super Admin login failed:", error);
      toast.error(error.response?.data?.message || "Login failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials, navigate) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/register", credentials, {
        withCredentials: true, // Ensure cookies are sent
      });
      toast.success(res.data.message || "Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Register failed:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // const logout = async () => {
  //   try {
  //     const res = await axiosInstance.post("/auth/logout");
  //     if (res.data.success) {
  //       setUser(null);
  //       toast.success("Logged out successfully");
  //     } else {
  //       toast.error(res.data.message || "Logout failed");
  //     }
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //     toast.error("Logout failed");
  //     setUser(null);
  //   }
  // };

const logout = async (navigate) => {
  try {
    const res = await axiosInstance.post("/auth/logout");
    if (res.data.success) {
      toast.success("Logged out successfully");
    } else {
      toast.error(res.data.message || "Logout failed");
    }
  } catch (error) {
    console.error("Logout failed:", error);
    toast.error("Logout failed");
  } finally {
    setUser(null);
    navigate('/');
  }
};


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        superAdminLogin,
        logout,
        loading,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;