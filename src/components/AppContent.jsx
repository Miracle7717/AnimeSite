import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AnimeDetail from "../pages/AnimeDetail";
import MyAnimeList from "../pages/my_anime_list";
import MyAnimeDetail from "../pages/my_anime_detail";
import AddAnime from "../pages/add_anime";
import EditAnime from "../pages/edit_anime";
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

        <Route path="/my-anime" element={<ProtectedRoute><MyAnimeList /></ProtectedRoute>} />
        <Route path="/my-anime/add" element={<ProtectedRoute><AddAnime /></ProtectedRoute>} />
        <Route path="/my-anime/:id" element={<ProtectedRoute><MyAnimeDetail /></ProtectedRoute>} />
        <Route path="/my-anime/:id/edit" element={<ProtectedRoute><EditAnime /></ProtectedRoute>} />
      
      </Routes>

      {user && <Footer />}
    </>
  );
}

export default AppContent;