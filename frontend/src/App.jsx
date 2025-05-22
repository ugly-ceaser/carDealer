import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingRoutes from "./routes/landing.routes.jsx";
import UserRoutes from "./routes/user.routes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <Routes>
              <Route path="/*" element={<LandingRoutes />} />
              <Route path="user/*" element={<UserRoutes />} />
            </Routes>
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
