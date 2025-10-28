import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import IntakeWell from "./components/IntakeWell";
import WaterDemand from "./components/WaterDemand";
import PumpDesign from "./components/PumpDesign";
import PresedimentationTank from "./components/PresedimentationTank";
import AerationUnit from "./components/AerationUnit";
import RapidMix from "./components/RapidMix";
import AlumDose from "./components/AlumDose";
import FlocculatorDesign from "./components/FlocculatorDesign";
import GravityFilter from "./components/GravityFilter";
import Chlorinator from "./components/Chlorinator";
import ClearWaterTank from "./components/ClearWaterTank";

function App() {
  return (
    <Router>
      <Nav />  {/* Navbar always visible */}

      <Routes>
        <Route path="/" element={<WaterDemand />} />
        <Route path="/intake-well" element={<IntakeWell />} />
        <Route path="/pump-design" element={<PumpDesign />} />
        <Route path="/Presedimentation-tank" element={<PresedimentationTank />} />
        <Route path="/Aeration-Unit" element={<AerationUnit />} />
        <Route path="/rapid-mix" element={<RapidMix />} />
        <Route path="/alum-dose" element={<AlumDose />} />
        <Route path="/flocculator-design" element={<FlocculatorDesign />} />
        <Route path="/Gravity-Filter" element={<GravityFilter />} />
        <Route path="/Chlorinator" element={<Chlorinator />} />
        <Route path="/ClearWaterTank" element={<ClearWaterTank />} />
      </Routes>
    </Router>
  );
}

export default App;  