import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import ScrollToTop from "./utils/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./utils/AuthContext";
import { initGA, logPageView } from "./utils/Analytics";

const usePageViews = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView();
  }, [location]);
};
const App: React.FC = () => {
  useEffect(() => {
    initGA();
  }, []);

  usePageViews();
  return (
    <Router>
      <AuthProvider>
        {/* Wrap your routes with AuthProvider */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ScrollToTop />

        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
