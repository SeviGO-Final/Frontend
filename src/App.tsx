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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="font-Poppins">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Admin Page - only accessible if logged in */}
            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute>
                  <DashboardAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-panel/user-management"
              element={
                <ProtectedRoute>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-panel/complaint-list"
              element={
                <ProtectedRoute>
                  <ComplaintList />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin-panel/detail-complaint"
              element={<DetailComplaintPage />}
            />

            <Route
              path="admin-panel/create-report"
              element={<CreateReport />}
            />


            {/* User Page - only accessible if logged in */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/new-report"
              element={
                <ProtectedRoute>
                  <NewReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/view/:id"
              element={
                <ProtectedRoute>
                  <ViewReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile"
              element={
                <ProtectedRoute>
                  <ProfileUser />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
