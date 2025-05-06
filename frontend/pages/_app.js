import { useEffect } from "react";
import { useRouter } from "next/router";  // Import useRouter from Next.js
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

export default function App({ Component, pageProps }) {
  const router = useRouter(); // Use Next.js router

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");  // Get token from local storage
      if (!token) {
        router.push("/");  // Use Next.js router.push for navigation
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.clear();  // Clear local storage on unauthorized access
          router.push("/");  // Redirect on invalid token
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.clear();
                router.push("/");  // Redirect on error
      }
    };

    checkToken();
  }, [router.pathname]);  // Dependency to run on route change

  return (
    <>
      <Component {...pageProps} />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
