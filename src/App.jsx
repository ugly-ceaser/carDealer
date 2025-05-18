import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LandingRoutes from "./routes/landing.routes.jsx";
import UserRoutes from "./routes/user.routes.jsx";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/*" element={<LandingRoutes/>} />
          <Route path="user/*" element={<UserRoutes/>} />
      </Routes>
    </Router>
  )
}

export default App
