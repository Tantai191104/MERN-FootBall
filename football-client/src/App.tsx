import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

const HomePage = lazy(() => import("./pages/home/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const PlayerDetail = lazy(() => import("./pages/player/PlayerDetail"));
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const TeamManage = lazy(() => import("./pages/admin/TeamManage"));
const MemberManage = lazy(() => import("./pages/admin/MemberManage"));
const PlayerManage = lazy(() => import("./pages/admin/PlayerManage"));
const BaseLayout = lazy(() => import("./layouts/BaseLayout"));

function App() {
  return (
    <>
      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/player/:playerId" element={<PlayerDetail />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/signUp" element={<SignUpPage />} />

            <Route element={<AdminRoute />}>
              <Route path="/admin/teamManage" element={<TeamManage />} />
              <Route path="/admin/memberManage" element={<MemberManage />} />
              <Route path="/admin/playerManage" element={<PlayerManage />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastClassName="!mt-32"
      />
    </>
  );
}

export default App;
