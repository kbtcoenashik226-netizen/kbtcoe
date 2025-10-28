import React, { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PumpDesign() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectTitle: "",
    dischargeRate: "",
    velocity: "",
    standbyPumps: "",
    suctionHead: "",
    requiredDischarge: "",
  });

  const [results, setResults] = useState(null);

  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  // 🧮 Calculation
  const calculatePumpDesign = () => {
    const q = parseFloat(form.dischargeRate);
    const Q = parseFloat(form.requiredDischarge);
    const V = parseFloat(form.velocity);
    const n = parseInt(form.standbyPumps);
    const H = parseFloat(form.suctionHead);

    if (isNaN(q) || isNaN(Q) || isNaN(V) || isNaN(n) || isNaN(H)) {
      alert("Please enter valid values for all fields");
      return;
    }

    const d = Math.sqrt((q * 4) / (Math.PI * V)); // diameter
    const Np = Q / q; // no. of pumps
    const Nt = n + Np; // total pumps
    const S = 2 * d; // clearance

    const output = {
      d: d.toFixed(2),
      Np: Math.ceil(Np),
      Nt: Math.ceil(Nt),
      S: S.toFixed(2),
    };

    setResults(output);
    localStorage.setItem("pumpDesignResults", JSON.stringify(output));
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Pump Design</div>

        <form className="form-container" onSubmit={(e) => e.preventDefault()}>
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={setField}
            help="Enter your project title."
          />

          <Field
            label="Required Discharge (Q)"
            name="requiredDischarge"
            value={form.requiredDischarge}
            onChange={setField}
            unit="MLD"
            help="Enter total discharge in MLD"
            type="number"
          />

          <Field
            label="Discharge rate of pump (q)"
            name="dischargeRate"
            value={form.dischargeRate}
            onChange={setField}
            unit="m³/sec"
            help="Default 0.5 m³/sec"
            type="number"
          />

          <Field
            label="Velocity in pipe (V)"
            name="velocity"
            value={form.velocity}
            onChange={setField}
            unit="m/sec"
            help="Default 0.75 m/sec"
            type="number"
          />

          <Field
            label="Number of standby pumps (n)"
            name="standbyPumps"
            value={form.standbyPumps}
            onChange={setField}
            unit="units"
            help="Max 2 units"
            type="number"
          />

          <Field
            label="Static suction head (H)"
            name="suctionHead"
            value={form.suctionHead}
            onChange={setField}
            unit="m"
            help="Max 10 m"
            type="number"
          />

          {/* Buttons */}
          <div className="button-row">
            <button type="button" className="secondary-btn" onClick={calculatePumpDesign}>
              Calculate
            </button>
            <button
              type="button"
              className="glow-btn"
              onClick={() => navigate("/Presedimentation-tank")}
            >
              Next
            </button>
          </div>
        </form>

        {results && (
          <div className="results-box">
            <h2 className="form-title blue">Results</h2>
            <p>Diameter of Pipe (d): {results.d} m</p>
            <p>Number of Pumps (Np): {results.Np}</p>
            <p>Total Pumps (Nt): {results.Nt}</p>
            <p>Clearance Between Pumps (S): {results.S} m</p>
          </div>
        )}
      </div>
    </div>
  );
}
