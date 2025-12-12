"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login
      router.push("/login");
    } else {
      // If token exists, allow access
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    // Show nothing or a loading spinner while checking
    return null; 
  }

  return <>{children}</>;
}
