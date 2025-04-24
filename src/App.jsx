import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChooseEvent from "./pages/ChooseEvent";
import WeddingEvent from "./pages/WeddingEvent";
import BirthdayEvent from "./pages/BirthdayEvent";
import CardleEvent from "./pages/CardleEvent";
import CollegeFest from "./pages/CollegeFest";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Home/Navbar";
import Footer from "./components/Home/Footer";
import ProtectedRoute from "./context/ProtectedRoute";
import CorporateEvent from "./pages/CorporateEvent";
import HouseEvent from "./pages/HouseEvent";
import PaymentPage from "./components/PaymentPage";
import PaymentSuccessful from "./components/PaymentSucessful";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/choose-event"
            element={
              <ProtectedRoute>
                <ChooseEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wedding-event"
            element={
              <ProtectedRoute>
                <WeddingEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/birthday-event"
            element={
              <ProtectedRoute>
                <BirthdayEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cardle-event"
            element={
              <ProtectedRoute>
                <CardleEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/college-event"
            element={
              <ProtectedRoute>
                <CollegeFest />
              </ProtectedRoute>
            }
          />

          <Route path="/corporate-event" element={<CorporateEvent/>}/>
        <Route path="/house-event" element={<HouseEvent/>}/>
        <Route path="/payment" element={<PaymentPage/>}/>
        <Route path="/payment-success" element={<PaymentSuccessful/>}/>
        <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
