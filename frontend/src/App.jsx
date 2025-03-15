import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaperTrading from "./Pages/Games/PaperTrading";
import InvestmentQuiz from "./Pages/Games/InvestmentQuiz";
import PredictMarket from "./Pages/Games/PredictMarket";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import SimulationPage from "./Pages/Simulation/SimulationPage";
import PortfolioPage from "./Pages/Portfolio/PortfolioPage";
// import LoginPage from "./Pages/Auth/LoginPage";
// import SignupPage from "./Pages/Auth/SignupPage";
// import LandingPage from "./Pages/LandingPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar"; // Import Sidebar Provider
import BudgetPage from "./Pages/Budget/BudgetPage";
import Register from "./Pages/Registration/Register";
import Login from "./Pages/Registration/Login";
import DriveFilesViewer from "./Pages/PDF/pdf";

import Home from "./components/home/home";
import ReportsPage from "./Pages/Report/ReportPage";


const Layout = ({ children }) => {
  const location = useLocation();

  // Show Sidebar for specific routes
  const showSidebar =
    location.pathname.startsWith("/game") ||
    location.pathname === "/simmulation" ||
    location.pathname === "/portfolio" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/budget" ||
    location.pathname === "/simulation" ||
    location.pathname === "/report";

  // Show Navbar only on Landing, Login, and Signup pages
  const showNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen">
        {showSidebar && <Sidebar className="w-64" />}
        <div className="flex flex-col flex-grow">
          {showNavbar && <Navbar />}{" "}
          {/* Navbar only for landing, login, signup */}
          <div className={showSidebar ? "p-4" : ""}>{children}</div> 
        </div>
      </div>
    </SidebarProvider>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/game/paper-trading" element={<PaperTrading />} />
          <Route path="/game/investment-quiz" element={<InvestmentQuiz />} />
          <Route path="/game/predict-market" element={<PredictMarket />} />
          <Route path="/simmulation" element={<SimulationPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/login" element={<Login />} />

          <Route path="/lessons" element={<DriveFilesViewer />} />

          <Route path="/report" element={<ReportsPage/>} />
          <Route path="/simulation" element={<SimulationPage/>} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
