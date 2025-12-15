import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetail from "./pages/AnimeDetail";
import BasketList from "./pages/basket_list";
import BasketDetail from "./pages/basket_detail";
import CreateOrder from "./pages/create_order";
import UpdateOrder from "./pages/update_order";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/basket" element={<BasketList />} />
        <Route path="/basket/create" element={<CreateOrder />} />
        <Route path="/basket/:id" element={<BasketDetail />} />
        <Route path="/basket/:id/edit" element={<UpdateOrder />} />
      
      </Routes>
      
      <Footer />
    </AuthProvider>
  );
}

export default App;