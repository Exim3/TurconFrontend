import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./Routes";
import ScrollToTop from "./utils/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./utils/AuthContext";
import { initGA, logPageView } from "./utils/Analytics";

// Custom hook to log page views
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

  return (
    <Router>
      <AuthProvider>
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
        <PageViewLogger /> {/* Ensure that this is used within Router */}
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

// Component to use page views hook
const PageViewLogger: React.FC = () => {
  usePageViews();
  return null;
};

export default App;
