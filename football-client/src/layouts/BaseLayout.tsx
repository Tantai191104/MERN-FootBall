import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function BaseLayout() {
  return (
    <div
      className="subpixel-antialiased min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom right, #F4F6F0, #FFFFFF)",
      }}
    >
      <Header />
      <main className="flex-grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default BaseLayout;
