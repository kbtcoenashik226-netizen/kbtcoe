import React, { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";

export default function Chlorinator() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectTitle: "",
    preChl: "",
    postChl: "",
    months: "",
    tankHeight: "",
    platformHeight: "",
    chlorineDensity: "",
  });

  const [results, setResults] = useState(null);

  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const calculateResults = () => {
    // Convert inputs to numbers
    const preChl = parseFloat(form.preChl) || 1.4;
    const postChl = parseFloat(form.postChl) || 0.1;
    const nMonths = parseFloat(form.months) || 6;
    const H = parseFloat(form.tankHeight) || 1;
    const platformH = parseFloat(form.platformHeight) || 2;
    const d = parseFloat(form.chlorineDensity) || 1562.5;

    const Q = 1000; // Example flow in m³/day, replace with actual

    // Calculations
    const totalChlorineApplied = preChl - postChl; // ppm
    const R = (totalChlorineApplied * Q) / 24; // mg/h
    const W = totalChlorineApplied * Q; // mg/day
    const Wt = W * 30 * nMonths; // mg for n months
    const V1 = Wt / (d * 1000); // tank volume m³
    const V2 = V1 * 0.1; // 10% extra
    const totalVolume = V1 + V2;
    const Dia = Math.sqrt((4 * totalVolume) / Math.PI);
    const l = Dia;

    setResults({
      totalChlorineApplied: totalChlorineApplied.toFixed(2),
      R: R.toFixed(2),
      W: W.toFixed(2),
      Wt: Wt.toFixed(2),
      V1: V1.toFixed(2),
      V2: V2.toFixed(2),
      totalVolume: totalVolume.toFixed(2),
      Dia: Dia.toFixed(2),
      l: l.toFixed(2),
    });

    localStorage.setItem("chlorinatorResults", JSON.stringify({
      totalChlorineApplied: totalChlorineApplied.toFixed(2),
      R: R.toFixed(2),
      W: W.toFixed(2),
      Wt: Wt.toFixed(2),
      V1: V1.toFixed(2),
      V2: V2.toFixed(2),
      totalVolume: totalVolume.toFixed(2),
      Dia: Dia.toFixed(2),
      l: l.toFixed(2),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Chlorinator</div>

        <form onSubmit={handleSubmit} className="form-container">
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={setField}
            help="Enter your project title."
          />

          <Field
            label="Liquid Chlorine Applied (pre_chl)"
            name="preChl"
            value={form.preChl}
            onChange={setField}
            unit="mg/lit"
            help="Liquid Chlorine Requirement - Monsoon - 1.4 mg/l, Winter - 1 mg/l, Summer - 0.6 mg/l"
            type="number"
          />

          <Field
            label="Residual Liquid Chlorine (post_chl)"
            name="postChl"
            value={form.postChl}
            onChange={setField}
            unit="mg/lit"
            help="Normal 0.1 mg/l - 0.2 mg/l"
            type="number"
          />

          <Field
            label="Required for Months (n)"
            name="months"
            value={form.months}
            onChange={setField}
            unit="months"
            help="Normally 6 months"
            type="number"
          />

          <Field
            label="Height of tank (H)"
            name="tankHeight"
            value={form.tankHeight}
            onChange={setField}
            unit="m"
            help="Normally 1m"
            type="number"
          />

          <Field
            label="Height of platform from top level of rapid sand gravity filter"
            name="platformHeight"
            value={form.platformHeight}
            onChange={setField}
            unit="m"
            help="Normally 2m"
            type="number"
          />

          <Field
            label="Density of Liquid Chlorine (d)"
            name="chlorineDensity"
            value={form.chlorineDensity}
            onChange={setField}
            unit="kg/m³"
            help="Normal 1562.5kg/m³ (may vary)"
            type="number"
          />

          {/* Buttons */}
          <div className="button-row">
            <button type="button" className="secondary-btn" onClick={calculateResults}>
              Calculate
            </button>
            <button type="submit" className="glow-btn" onClick={() => navigate("/ClearWaterTank")}>
              Next
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div className="results-box">
              <h3>Results</h3>
              <p>Total Liquid Chlorine applied (ppm): {results.totalChlorineApplied}</p>
              <p>Liquid chlorine required per hour (R): {results.R} mg/h</p>
              <p>Chlorine per day (W): {results.W} mg/day</p>
              <p>Total Chlorine required for {form.months} months (Wt): {results.Wt} mg</p>
              <p>Volume of tank (V1): {results.V1} m³</p>
              <p>Volume for Provision of drainage, mixing, and stirring (V2): {results.V2} m³</p>
              <p>Total volume (V): {results.totalVolume} m³</p>
              <p>Diameter of tank (Dia): {results.Dia} m</p>
              <p>Square Platform with one side (l): {results.l} m</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
