import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";

import { Home, Customers, Profile, LoginPage } from "./pages";
import DefaultLayout from "./layout/DefaultLayout";

function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<PrivateRoutes />}>
            {user !== null && (
              <Route path="/" element={<Navigate to={`/home`} />} />
            )}
            <Route path="app" element={<DefaultLayout />}>
              <Route path="home" element={<Home />} />
              <Route path="customers" element={<Customers />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={<Navigate to={user === null ? "/login" : `/app/home`} />}
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
