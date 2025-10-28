import React, { useState } from "react";
import "./WaterDemand.css";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function IntakeWellForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectTitle: "",
    quantityPerDayMLD: "",
    inletVelocity: "",
    openings: "",
    barDiameter: "",
    barSpacing: "",
    screenWidth: "",
    intakeDiameter: "",
    depthBelow: "",
    depthAbove: "",
    gravityMainVelocity: "",
    maxPipeDiameter: "",
    pipeCoeffC: "",
  });

  const [results, setResults] = useState(null);

  const num = (v) => (v === "" || v === null ? NaN : Number(v));

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateAll = () => {
    const Q = (num(form.quantityPerDayMLD) * 1000) / (24 * 60 * 60); // m³/sec
    const A = Q / num(form.inletVelocity); // Area for opening in screen
    const Ah = 2 * A; // Total opening area considering bars
    const oneScreenArea = Ah / 2; // Area for one screen
    const h = oneScreenArea / num(form.screenWidth); // Height of screen

    setResults({
      Q: Q.toFixed(3),
      A: A.toFixed(3),
      Ah: Ah.toFixed(3),
      oneScreenArea: oneScreenArea.toFixed(3),
      h: h.toFixed(3),
    });

    localStorage.setItem("intakeWellResults", JSON.stringify({
      Q: Q.toFixed(3),
      A: A.toFixed(3),
      Ah: Ah.toFixed(3),
      oneScreenArea: oneScreenArea.toFixed(3),
      h: h.toFixed(3),
    }));
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Intake Well</div>

        <div className="form-container two-col">
          <section>
            <section aria-label="Left column inputs">
              <Field
                label="Project Title"
                name="projectTitle"
                value={form.projectTitle}
                onChange={handleChange}
                placeholder="e.g., Water Supply Project"
              />

              <Field
                label="Quantity of water required per day (Q')"
                name="quantityPerDayMLD"
                value={form.quantityPerDayMLD}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="MLD"
                help="Enter demand in MLD."
              />

              <Field
                label="Velocity of water at inlet opening (V)"
                name="inletVelocity"
                value={form.inletVelocity}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m/sec"
                help="Value should not exceed 0.8 m/sec."
                badge="Max 0.8 m/sec"
              />

              <Field
                label="Number of openings"
                name="openings"
                value={form.openings}
                onChange={handleChange}
                type="number"
                step="1"
                min="1"
                help="Enter count (integer)."
              />

              <Field
                label="Bars of diameter"
                name="barDiameter"
                value={form.barDiameter}
                onChange={handleChange}
                type="number"
                step="1"
                unit="mm"
              />

              <Field
                label="Spacing of bars (S)"
                name="barSpacing"
                value={form.barSpacing}
                onChange={handleChange}
                type="number"
                step="1"
                unit="mm"
                help="Required spacing values within 20–50 mm."
                badge="20–50 mm"
              />

              <Field
                label="Width of screen (W)"
                name="screenWidth"
                value={form.screenWidth}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m"
                help="Please input assumed width in meter."
              />
            </section>

            <section aria-label="Right column inputs">
              <Field
                label="Diameter of intake well (D)"
                name="intakeDiameter"
                value={form.intakeDiameter}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m"
                help="Please input diameter values to max. of 10 m."
                badge="Max 10 m"
              />

              <Field
                label="Depth of well below water level (d1)"
                name="depthBelow"
                value={form.depthBelow}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m"
                help="Please input depth value min. 3 m."
                badge="Min 3 m"
              />

              <Field
                label="Depth of the well above water level (d2)"
                name="depthAbove"
                value={form.depthAbove}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m"
                help="Please input value – max. 10 m."
                badge="Max 10 m"
              />

              <Field
                label="Velocity of water in gravity main (V)"
                name="gravityMainVelocity"
                value={form.gravityMainVelocity}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m/sec"
                help="Please input values in m/sec."
                badge="Max 1.2 m/sec"
              />

              <Field
                label="Maximum diameter of pipe"
                name="maxPipeDiameter"
                value={form.maxPipeDiameter}
                onChange={handleChange}
                type="number"
                step="0.01"
                unit="m"
              />

              <Field
                label="Coefficient of pipe material (C)"
                name="pipeCoeffC"
                value={form.pipeCoeffC}
                onChange={handleChange}
                type="number"
                step="1"
                help="Normal value – 100."
                badge="Normal: 100"
              />
            </section>

            {/* Buttons */}
            <div className="button-row">
              <button type="button" className="secondary-btn" onClick={calculateAll}>
                Calculate
              </button>
              <button type="button" className="glow-btn" onClick={() => navigate("/pump-design")}>
                Next
              </button>
            </div>

            {/* Results Section */}
            {results && (
              <div className="results-box">
                <h3>Results</h3>
                <p>Discharge Required per sec (Q): {results.Q} m³/sec</p>
                <p>Area required for opening in the screen (A): {results.A} m²</p>
                <p>Half area is required for placing of bars, total opening area (Ah): {results.Ah} m²</p>
                <p>Area of one Screen: {results.oneScreenArea} m²</p>
                <p>Height of Screen (h): {results.h} m</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
