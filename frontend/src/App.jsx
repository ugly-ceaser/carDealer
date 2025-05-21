import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingRoutes from "./routes/landing.routes.jsx";
import UserRoutes from "./routes/user.routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import AuthGuard from "./component/AuthGuard.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<LandingRoutes />} />
          <Route path="user/*" element={<UserRoutes />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
