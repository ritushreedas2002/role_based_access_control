
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import AdminPage from "./pages/AdminPage";
import DeveloperPage from "./pages/DeveloperPage";
import ClientPage from "./pages/ClientPage";
import ProtectedLayout from "./components/ProtectedLayout.jsx";


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />

          <Route element={<ProtectedLayout />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/developer" element={<DeveloperPage />} />
            <Route path="/client" element={<ClientPage />} />
          </Route>
        </Routes>
      </Router>
  );
}

export default App;

