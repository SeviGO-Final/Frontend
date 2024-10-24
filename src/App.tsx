import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import LandingPage from "./components/pages/LandingPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardAdmin from "./components/pages/admin/Dashboard";

function App() {
  return (
    <Router>
      <div className="font-Poppins">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
