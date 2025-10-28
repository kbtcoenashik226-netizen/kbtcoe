import React, { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";


export default function RapidMix() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectTitle: "",
    detentiontime: "",
    height: "",
    rhd: "",
    rdd: "",
    rotspeedimp: "",
    powerrate: "",
    motor: "",
  });
  
  const [results, setResults] = useState(null);
  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  // Function to parse ratio input like "1.5:1" into decimal
  const parseRatio = (val) => {
    if (!val) return 0;
    if (typeof val === "string" && val.includes(":")) {
      const [num, den] = val.split(":").map(Number);
      if (!isNaN(num) && !isNaN(den) && den !== 0) {
        return num / den;
      }
    }
    return parseFloat(val);
  };

  const calculateRapidMix = () => {
    const Q = 13; // MLD (constant)
    const t = parseFloat(form.detentiontime) || 0; // sec
    const H = parseFloat(form.height) || 1; // m
    const rhd = parseRatio(form.rhd) || 1.5; // Height:Diameter ratio
    const rdd = parseRatio(form.rdd) || 0.4; // Impeller:Tank ratio
    const p = parseFloat(form.powerrate) || 2; // watt/m³
    const motorHP = parseFloat(form.motor) || 1; // HP reference

    const Qp = (Q * 1000) / 24;
    const C = Qp * (t / 3600);
    const D = H / rhd;
    const V = (Math.PI * Math.pow(D, 2) * H) / 4;
    const no = Math.ceil(C / V) || 1;
    const HP = (p * V) / 746;
    const d = rdd * D;

    const results = {
      Qp: Qp.toFixed(2),
      C: C.toFixed(3),
      D: D.toFixed(3),
      V: V.toFixed(3),
      no,
      HP: HP.toFixed(3),
      d: d.toFixed(3),
    };

    setResults(results);

    // 🧠 Save to localStorage
    localStorage.setItem("rapidMixResults", JSON.stringify(results));
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Rapid Mix</div>

        <form className="form-container">
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={setField}
            help="Enter your project title."
          />

          <Field
            label="Detention Time (t)"
            name="detentiontime"
            value={form.detentiontime}
            onChange={setField}
            unit="sec"
            help="Normal Range 30 - 60 sec"
            type="number"
          />

          <Field
            label="Height of tank considering free board (H)"
            name="height"
            value={form.height}
            onChange={setField}
            unit="m"
            help="Normally 2m and Max 3m"
            type="number"
          />

          <Field
            label="Ratio of Tank Height to Diameter"
            name="rhd"
            value={form.rhd}
            onChange={setField}
            help="Enter ratio like 1.5:1 or decimal like 1.5"
            type="text"
          />

          <Field
            label="Ratio of Impeller diameter to Tank Diameter"
            name="rdd"
            value={form.rdd}
            onChange={setField}
            help="Enter ratio like 0.4:1 or decimal like 0.4"
            type="text"
          />

          <Field
            label="Rotational Speed of Impeller (n)"
            name="rotspeedimp"
            value={form.rotspeedimp}
            onChange={setField}
            unit="rpm"
            help="Normal Range 100 - 250 rpm"
            type="number"
          />

          <Field
            label="Power Rate (p)"
            name="powerrate"
            value={form.powerrate}
            onChange={setField}
            unit="watt/m³"
            help="Normal ~2W (it may vary)"
            type="number"
          />

          <Field
            label="Motor of 1HP is Required for Treating Water 6.31 MLD"
            name="motor"
            value={form.motor}
            onChange={setField}
            unit="HP"
            help="Reference motor power"
            type="number"
          />

          {/* Buttons */}
          <div className="button-row">
            <button
              type="button"
              className="secondary-btn"
              onClick={calculateRapidMix}
            >
              Calculate
            </button>
            <button
              type="submit"
              className="glow-btn"
              onClick={() => navigate("/alum-dose")}
            >
              Next
            </button>
          </div>
        </form>

        {/* Results Section */}
        {results && (
          <div className="results-box">
            <h2 className="form-title blue">Results</h2>
            <p>Design Flow (Q’): {results.Qp} m³/hr</p>
            <p>Capacity of tank (C): {results.C} m³</p>
            <p>Diameter of tank (D): {results.D} m</p>
            <p>Volume of tank (V): {results.V} m³</p>
            <p>Number of rapid mix units (no): {results.no}</p>
            <p>Required motor power (HP): {results.HP} HP</p>
            <p>Diameter of impeller (d): {results.d} m</p>
          </div>
        )}
      </div>
    </div>
  );
}
