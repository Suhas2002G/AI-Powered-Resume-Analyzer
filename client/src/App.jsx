import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ThemeProvider } from "./hooks/useTheme";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer
          style={{ marginTop: "70px" }}
          position="top-center"
          autoClose={3000}
        />
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />

            {/* vercel monitoring component  */}
            <Analytics />
            <SpeedInsights />
            
          </div>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
