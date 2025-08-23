import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Invitations from "./pages/Invitations";
import Venues from "./components/vendors/venues";
import Auth from "./pages/Auth";
import WeddingPlanner from "./pages/WeddingPlanner";
import About from "./pages/About";
import Caterers from "./components/vendors/cateres";
import Photographers from "./components/vendors/Photographers";
import ProtectedRoute from "./components/core/ProtectedRoute";


// Layouts
import Layout_navbar from "./components/core/Layout_navbar";
import Layout_plain from "./components/core/Layout_plain"; // New layout without navbar/footer

// Pages
import VendorRegister from "./pages/vendor_reg/VendorRegister";
import Photo_reg from "./pages/vendor_reg/Photo_reg";
import Caterer_reg from "./pages/vendor_reg/Caterer_reg";
import Venue_reg from "./pages/vendor_reg/Venue_reg";


export default function App() {
  return (
    <Routes>
      {/* ✅ Routes WITH Navbar & Footer */}
      <Route element={<Layout_navbar />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />

        {/* ✅ Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/weddingplanner" element={<WeddingPlanner />} />
          <Route path="/invitations" element={<Invitations />} />
          <Route path="/vendors/venues" element={<Venues />} />
          <Route path="/vendors/photographers" element={<Photographers />} />
          <Route path="/vendors/caterers" element={<Caterers />} />
        </Route>
      </Route>

      {/* ❌ Route WITHOUT Navbar & Footer */}
      <Route element={<Layout_plain />}>
        <Route path="/photo_reg" element={<Photo_reg />} />
        <Route path="/vendorregister" element={<VendorRegister />} />
        <Route path="/Caterer_reg" element={<Caterer_reg />} />
        <Route path="/Venue_reg" element={<Venue_reg />} />



      </Route>
    </Routes>
  );
}
