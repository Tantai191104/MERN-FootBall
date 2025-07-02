import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.warn("You must be login to access this page");
      const timer = setTimeout(() => {
        setShouldRedirect(true);
      }, 1000); // đủ thời gian hiển thị toast

      return () => clearTimeout(timer); // cleanup nếu component unmount
    }
  }, [isAuthenticated]);

  if (!isAuthenticated && shouldRedirect) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isAuthenticated) {
    return null; // đợi toast hiển thị trước khi chuyển hướng  
  }

  return children;
};

export default ProtectedRoute;
