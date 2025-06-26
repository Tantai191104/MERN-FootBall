import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { lazy } from "react";
import PlayerDetail from "./pages/home/player/PlayerDetail";
import LoginPage from "./pages/home/auth/LoginPage";
import SignUpPage from "./pages/home/auth/SignUpPage";
const BaseLayout = lazy(() => import("./layouts/BaseLayout"));
function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/player" element={<PlayerDetail />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signUp" element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default App;
