import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaperTrading from "./Pages/Games/PaperTrading";
import InvestmentQuiz from "./Pages/Games/InvestmentQuiz";
import PredictMarket from "./Pages/Games/PredictMarket";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import SimulationPage from "./Pages/Simulation/SimulationPage";
// import Home from "./Home"; // Example home component

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/game/paper-trading" element={<PaperTrading />} />
        <Route path="/game/investment-quiz" element={<InvestmentQuiz />} />
        <Route path="/game/predict-market" element={<PredictMarket />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/simmulation" element={<SimulationPage/>} />
      </Routes>
    </Router> 
  );
}

export default App;
