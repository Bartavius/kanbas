import { useEffect, useState } from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import Kanbas from "./Kanbas";
import store from "./Kanbas/store";
import * as client from "./client";

export default function App() {
  const [error, setError] = useState<string>("");

  // useEffect to check the server connection
  useEffect(() => {
    const findConnection = async () => {
      try {
        await client.findConnection();  // Check if the server is reachable
      } catch (error) {
        setError("Failed to connect to server");  // Set the error message if the connection fails
      }
    };

    findConnection();
  }, []); 

  // If there's an error, show the error message
  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h3>Something went wrong. {error}</h3>
      </div>
    );
  }

  return (
    <HashRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </Provider>
    </HashRouter>
  );
}
