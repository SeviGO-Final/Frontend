import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import UserManagement from "./pages/admin/UserManagement";
import DashboardUser from "./pages/user/DashboardUser";
import NewReport from "./pages/user/NewReport";
import ComplaintList from "./pages/admin/ComplainList";
import HistoryPage from "./pages/user/History";
import ViewReport from "./pages/user/ViewReport";
import ProfileUser from "./pages/user/ProfileUser";
import { AuthProvider } from "./middlewares/AuthContext";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import DetailComplaintPage from "./pages/admin/DetailComplaint";
import CreateReport from "./pages/admin/CreateReport";
import Layout from "./components/Layout"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-Poppins">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              {/* Admin Routes */}
              <Route path="/admin-panel" element={<DashboardAdmin />} />
              <Route path="/admin-panel/user-management" element={<UserManagement />} />
              <Route path="/admin-panel/complaint-list" element={<ComplaintList />} />
              <Route path="/admin-panel/detail-complaint" element={<DetailComplaintPage />} />
              <Route path="/admin-panel/create-report" element={<CreateReport />} />

              {/* User Routes */}
              <Route path="/dashboard" element={<DashboardUser />} />
              <Route path="/dashboard/new-report" element={<NewReport />} />
              <Route path="/dashboard/history" element={<HistoryPage />} />
              <Route path="/dashboard/view/:id" element={<ViewReport />} />
              <Route path="/dashboard/profile" element={<ProfileUser />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
