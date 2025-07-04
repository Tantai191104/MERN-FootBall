import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.isAdmin ?? false;

  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must log in first");
      setRedirectTo("/auth/login");
    } else if (!isAdmin) {
      toast.error("Only admin can access this page");
      setRedirectTo("/");
    }
  }, [isAuthenticated, isAdmin]);

  // Khi có redirect → chuyển hướng
  if (redirectTo) return <Navigate to={redirectTo} replace />;

  // Đang kiểm tra quyền, chưa hiển thị gì
  if (!isAuthenticated || !isAdmin) return null;

  return <Outlet />;
};

export default AdminRoute;
