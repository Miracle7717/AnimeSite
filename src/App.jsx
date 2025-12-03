import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetail from "./pages/AnimeDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/anime/:id" element={<AnimeDetail />} />
    </Routes>
  );
}
export default App;