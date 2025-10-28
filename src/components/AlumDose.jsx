import React, { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";

export default function AlumDose() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectTitle: "",
    alumApplied: "",
    h: "",
    reqForMonths: "",
    heightOfTank: "",
    densityOfAlum: "",
  });

  const [results, setResults] = useState(null);

  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const calculateAlumDose = () => {
    const Q = 13; // MLD (constant given earlier)
    const alumApplied = parseFloat(form.alumApplied) || 0; // mg/L
    const n = parseFloat(form.reqForMonths) || 0; // months
    const H = parseFloat(form.heightOfTank) || 1; // m
    const d = parseFloat(form.densityOfAlum) || 2672; // kg/m³ (default)

    // Alum required per hour (R)
    const R = (Q * 1000 * alumApplied) / 24; // g/hr

    // Alum required per day (W)
    const W = R * 24 / 1000; // kg/day

    // Total alum required for n months (Wt)
    const days = n * 30; // approx.
    const Wt = W * days; // kg

    // Volume of tank (V1)
    const V1 = Wt / d; // m³

    // Add 10% extra volume (V2)
    const V2 = V1 * 0.1; // m³

    // Total volume (V)
    const V = V1 + V2; // m³

    // Diameter of cylindrical tank
    const dia = Math.sqrt((4 * V) / (Math.PI * H)); // m

    // Square platform side length (l)
    const l = dia + 0.3; // m (added freeboard for platform)

    setResults({
      R:R.toFixed(2),
      W:W.toFixed(2),
      Wt:Wt.toFixed(2),
      V1:V1.toFixed(3),
      V2:V2.toFixed(3),
      V:V.toFixed(3),
      dia:dia.toFixed(3),
      l:l.toFixed(3),
    });

    localStorage.setItem("alumDoseResults", JSON.stringify({
      R:R.toFixed(2),
      W:W.toFixed(2),
      Wt:Wt.toFixed(2),
      V1:V1.toFixed(3),
      V2:V2.toFixed(3),
      V:V.toFixed(3),
      dia:dia.toFixed(3),
      l:l.toFixed(3),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Alum Dose</div>

        <form onSubmit={handleSubmit} className="form-container">
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={setField}
            help="Enter your project title."
          />

          <Field
            label="Alum Applied (ppm)"
            name="alumApplied"
            value={form.alumApplied}
            onChange={setField}
            unit="mg/lit"
            help="Alum Requirement:- Monsoon - 50mg/l, Winter - 20mg/l, Summer - 5mg/l"
            type="number"
          />

          <Field
            label="Height of Platform from top level rapid mix unit (h)"
            name="h"
            value={form.h}
            onChange={setField}
            unit="m"
            help="Normally - 2m (upto max 2m)"
            badge="Max 2"
            type="number"
          />

          <Field
            label="Required for months (n)"
            name="reqForMonths"
            value={form.reqForMonths}
            onChange={setField}
            unit="months"
            help="Normally 6 months"
            type="number"
          />

          <Field
            label="Height of Tank (H)"
            name="heightOfTank"
            value={form.heightOfTank}
            onChange={setField}
            unit="m"
            help="Normally 1 m"
            type="number"
          />

          <Field
            label="Density of Alum (d)"
            name="densityOfAlum"
            value={form.densityOfAlum}
            onChange={setField}
            unit="kg/m³"
            help="Generally its value is 2672kg/m³ or it may vary"
            type="number"
          />

          {/* Buttons */}
          <div className="button-row">
            <button
              type="button"
              className="secondary-btn"
              onClick={calculateAlumDose}
            >
              Calculate
            </button>
            <button
              type="submit"
              className="glow-btn"
              onClick={() => navigate("/flocculator-design")}
            >
              Next
            </button>
          </div>
        </form>

        {/* Results */}
        {results && (
          <div className="results-box">
            <h2 className="form-title blue">Results</h2>
            <p>Alum required per hour (R): {results.R} g/hr</p>
            <p>Alum required per day (W): {results.W} kg/day</p>
            <p>Total Alum required for n months (Wt): {results.Wt} kg</p>
            <p>Volume of tank (V1): {results.V1} m³</p>
            <p>Volume for Provision of drainage, mixing, and stirring (V2): {results.V2} m³</p>
            <p>Total volume (V): {results.V} m³</p>
            <p>Diameter of tank (dia): {results.dia} m</p>
            <p>Square Platform with one side (l): {results.l} m</p>
          </div>
        )}
      </div>
    </div>
  );
}
