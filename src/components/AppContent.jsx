import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AnimeDetail from "../pages/AnimeDetail";
import BasketList from "../pages/basket_list";
import BasketDetail from "../pages/basket_detail";
import CreateOrder from "../pages/create_order";
import UpdateOrder from "../pages/update_order";
import About from "../pages/About";
import Contacts from "../pages/Contacts";
import Header from "./Header";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "../AuthContext";

function AppContent() {
  const { user } = useAuth();

  return (
    <>
      {user && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<ProtectedRoute><AnimeDetail /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />

        <Route path="/basket" element={<ProtectedRoute><BasketList /></ProtectedRoute>} />
        <Route path="/basket/create" element={<ProtectedRoute><CreateOrder /></ProtectedRoute>} />
        <Route path="/basket/:id" element={<ProtectedRoute><BasketDetail /></ProtectedRoute>} />
        <Route path="/basket/:id/edit" element={<ProtectedRoute><UpdateOrder /></ProtectedRoute>} />

      </Routes>

      {user && <Footer />}
    </>
  );
}

export default AppContent;