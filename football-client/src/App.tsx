import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { lazy } from "react";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import PlayerDetail from "./pages/player/PlayerDetail";
import ProfilePage from "./pages/profile/ProfilePage";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
function App() {
  return (
    <>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/player:playerId" element={<PlayerDetail />} />
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
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
