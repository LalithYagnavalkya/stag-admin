import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { PrivateRoutes } from "./routes/PrivateRoutes";

import {
  Home,
  Customers,
  Profile,
  LoginPage,
  SingleCustomer,
  UserInfo,
  Register,
} from "./pages";
import DefaultLayout from "./layout/DefaultLayout";
import styled from "styled-components";
function App() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <AppStyles>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<PrivateRoutes />}>
            {user !== null && (
              <Route path="/" element={<Navigate to={`/home`} />} />
            )}
            <Route path="app" element={<DefaultLayout />}>
              <Route path="home" element={<Home />} />
              <Route index path="customers" element={<Customers />}></Route>
              <Route path="customers/:id" element={<SingleCustomer />} />
              <Route path="profile" element={<Profile />} />
              <Route path="userinfo" element={<UserInfo />} />
            </Route>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="*"
            element={
              <Navigate
                to={user === null ? "/login" || "/register" : `/app/home`}
              />
            }
          />
        </Routes>
      </AnimatePresence>
    </AppStyles>
  );
}

export default App;
const AppStyles = styled.div`
  width: 100%;
  background-color: white;
`;
