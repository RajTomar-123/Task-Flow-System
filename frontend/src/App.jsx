import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Registration from "./components/Registration"
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>

          <Route element={<ProtectedRoute />}>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>

    </>
  )
}