import Labs from "./Labs";
import Kanbas from "./Kanbas";
import Home from "./Home";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="Labs" />} />
        <Route path="/Labs/*" element={<Labs />} />
        <Route path="/Kanbas/*" element={<Kanbas />} />
      </Routes>
    </HashRouter>
  );
}

