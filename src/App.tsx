import Labs from "./Labs";
import Kanbas from "./Kanbas";
import store from "./Kanbas/store";
import { Provider } from "react-redux";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          {/* <Route path="/Labs/*" element={<Labs />} /> */}
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </Provider>
    </HashRouter>
  );
}

