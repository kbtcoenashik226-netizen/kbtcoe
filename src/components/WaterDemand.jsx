import React, { useState } from "react";
import "./WaterDemand.css";
import { useNavigate } from "react-router-dom";


export default function WaterDemand() {
  const [formData, setFormData] = useState({
    projectTitle: "",
    presentPopulation: "",
    growthRate: "",
    decades: "",
    perCapita: "135",
  });

  const navigate = useNavigate();

  const [results, setResults] = useState(null); // To store calculation results

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to calculate water demand
  const calculateWaterDemand = () => {
    const P0 = Number(formData.presentPopulation);
    const r = Number(formData.growthRate);
    const n = Number(formData.decades);
    const pcd = Number(formData.perCapita);

    if (isNaN(P0) || isNaN(r) || isNaN(n) || isNaN(pcd)) {
      alert("Please enter valid numbers for all fields");
      return;
    }

    const Pn = P0 * Math.pow(1 + r / 100, n);
    const WD = (Pn * pcd) / 1000000; // in MLD
    const Fd = (100 * Math.sqrt(Pn / 1000)) / 1000;
    const Q = WD + Fd;

    const q1 = Q - 0.03 * Q;
    const q2 = q1 - 0.02 * q1;
    const q3 = q2 - 0.02 * q2;

    const resultsObj = {
      Pn: Pn.toFixed(2),
      WD: WD.toFixed(2),
      Fd: Fd.toFixed(2),
      Q: Q.toFixed(2),
      q1: q1.toFixed(2),
      q2: q2.toFixed(2),
      q3: q3.toFixed(2),
    };

    setResults(resultsObj);

    // ✅ Store in localStorage for IntakeWell
    localStorage.setItem("waterDemandResults", JSON.stringify({
      ...formData,
      ...resultsObj
    }));
  };

  // Handle Calculate button
  const handleCalculate = (e) => {
    e.preventDefault();
    calculateWaterDemand();
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Water Demand</div>

        <form className="form-container">
          {/* Form Inputs */}
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              placeholder="Enter project title"
            />
          </div>

          <div className="form-group">
            <label>Present population of the city (Po)</label>
            <input
              type="number"
              name="presentPopulation"
              value={formData.presentPopulation}
              onChange={handleChange}
              placeholder="Enter population"
            />
          </div>

          <div className="form-group">
            <label>Growth rate of population per decade (%)</label>
            <input
              type="number"
              name="growthRate"
              value={formData.growthRate}
              onChange={handleChange}
              placeholder="Enter growth rate"
            />
          </div>

          <div className="form-group">
            <label>Number of decades (n)</label>
            <input
              type="number"
              name="decades"
              value={formData.decades}
              onChange={handleChange}
              placeholder="Enter number of decades"
            />
          </div>

          <div className="form-group">
            <label>Per capita demand of water</label>
            <input
              type="number"
              name="perCapita"
              value={formData.perCapita}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="button-row">
            <button type="button" className="secondary-btn" onClick={handleCalculate}>
              Calculate
            </button>
            <button
              type="button"
              className="glow-btn"
              onClick={() => navigate("/intake-well")}
            >
              Next
            </button>
          </div>
        </form>

        {/* Display Calculation Results */}
        {results && (
          <div className="results-box">
            <h3>Calculation Results:</h3>
            <p>Future Population (Pn): {results.Pn}</p>
            <p>Water Demand (WD): {results.WD} MLD</p>
            <p>Fire Demand (Fd): {results.Fd} MLD</p>
            <p>Total Discharge (Q): {results.Q} MLD</p>
            <p>After 3% Loss (q1): {results.q1} MLD</p>
            <p>After 2% Loss (q2): {results.q2} MLD</p>
            <p>After 2% Loss (q3): {results.q3} MLD</p>
          </div>
        )}
      </div>
    </div>
  );
}
