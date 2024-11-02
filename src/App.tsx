import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import UserManagement from "./pages/admin/UserManagement";
import DashboardUser from "./pages/user/DashboardUser";
import NewReport from "./pages/user/NewReport";

function App() {
  return (
    <Router>
      <div className="font-Poppins">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-panel" element={<DashboardAdmin />} />
          <Route
            path="/admin-panel/user-management"
            element={<UserManagement />}
          />
          {/* User Page */}
          <Route path="/dashboard" element={<DashboardUser />} />
          <Route path="/dashboard/new-report" element={<NewReport />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
