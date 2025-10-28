import { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";

export default function PresedimentationTank() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectTitle: "",
    overflowRate: "",
    minDepth: "",
    pumpingHours: "",
    detentionPeriod: "",
    effectiveDepth: "",
    freeBoard: "",
    ratioH: "",
    ratioV: "",
    widthTank: "",
    influentWidth: "",
    influentDepth: "",
    influentSpacing: "",
    orificeWidth: "",
    orificeDepth: "",
    weirLoading: "",
    launders: "",
    launderWidth: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    // Example calculations (replace with real formulas later)
    const res = {
      general: {
        overflowRate: `${form.overflowRate || 30} m³/m²/day`,
        minDepth: `${form.minDepth || 2.5} m`,
      },
      hydraulic: {
        inflow: "Q' = 12000 m³/day", // placeholder
        discharge: "q = 500 m³/hr",
        volume: "V = 3000 m³",
        length: "L = 40 m",
        tankVolume: "v = 1500 m³",
        tankArea: "A = 300 m²",
        numTanks: "No = 2",
      },
      influent: {
        num: "no = 4",
        spacing: "S' = 0.5 m",
      },
      effluent: {
        outflow: "Q' = 12000 m³/day",
        weirLength: "L = 48 m",
        spacing: "S'' = 2 m",
        launderLength: "LL = 12 m",
      },
    };

    setResults(res);
    localStorage.setItem("preSedimentationResults", JSON.stringify(res))
  };

  return (
    <div className="page-container">
      <div className="form-box">
        {/* Breadcrumb */}
        <div className="breadcrumb bold">Pre-Sedimentation Tank</div>

        {/* Form container */}
        <div className="form-container">
          <h2 className="form-title blue">Pre-Sedimentation Tank</h2>

          {/* Section: Basic Info */}
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
          />
          <Field
            label="Over flow rate (Q)"
            name="overflowRate"
            value={form.overflowRate}
            onChange={handleChange}
            unit="m³/m²/day"
          />
          <Field
            label="Minimum Side water depth (h)"
            name="minDepth"
            value={form.minDepth}
            onChange={handleChange}
            unit="m"
          />

          {/* Section: Hydraulic Design */}
          <h3 className="form-title blue">Hydraulic Design</h3>
          <Field
            label="Duration of pumping per day (t)"
            name="pumpingHours"
            value={form.pumpingHours}
            onChange={handleChange}
            unit="hours/day"
          />
          <Field
            label="Detention period (T)"
            name="detentionPeriod"
            value={form.detentionPeriod}
            onChange={handleChange}
            unit="hours/day"
          />
          <Field
            label="Effective Depth (H')"
            name="effectiveDepth"
            value={form.effectiveDepth}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Free Board (h)"
            name="freeBoard"
            value={form.freeBoard}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Ratio of length and width"
            name="ratioH"
            value={form.ratioH}
            onChange={handleChange}
          />
          <Field
            label="Vertical"
            name="ratioV"
            value={form.ratioV}
            onChange={handleChange}
          />
          <Field
            label="Width of the tank (W)"
            name="widthTank"
            value={form.widthTank}
            onChange={handleChange}
            unit="m"
          />

          {/* Section: Influent Structure */}
          <h3 className="form-title blue">Influent Structure</h3>
          <Field
            label="Width of influent structure (w)"
            name="influentWidth"
            value={form.influentWidth}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Depth of influent structure (d)"
            name="influentDepth"
            value={form.influentDepth}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Spacing of influent structure (S)"
            name="influentSpacing"
            value={form.influentSpacing}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Width of orifice (w’)"
            name="orificeWidth"
            value={form.orificeWidth}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Depth of orifice (d’)"
            name="orificeDepth"
            value={form.orificeDepth}
            onChange={handleChange}
            unit="m"
          />

          {/* Section: Effluent Structure */}
          <h3 className="form-title blue">Effluent Structure</h3>
          <Field
            label="Weir loading (W)"
            name="weirLoading"
            value={form.weirLoading}
            onChange={handleChange}
            unit="m³/day/m"
          />
          <Field
            label="Number of launder troughs (no)"
            name="launders"
            value={form.launders}
            onChange={handleChange}
          />
          <Field
            label="Width of central launder trough (Wc)"
            name="launderWidth"
            value={form.launderWidth}
            onChange={handleChange}
            unit="m"
          />

          {/* Buttons */}
          <div className="button-row">
            <button
              type="button"
              className="secondary-btn"
              onClick={handleCalculate}
            >
              Calculate
            </button>
            <button
              type="submit"
              className="glow-btn"
              onClick={() => navigate("/aeration-unit")}
            >
              Next
            </button>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="results-box">
            <h2 className="form-title blue">Results</h2>

            <h3>General</h3>
            <p>Overflow rate (Q): {results.general.overflowRate}</p>
            <p>Minimum side water depth (h): {results.general.minDepth}</p>

            <h3>Hydraulic Design</h3>
            <p>Total inflow (Q’): {results.hydraulic.inflow}</p>
            <p>Discharge per hour (q): {results.hydraulic.discharge}</p>
            <p>Total Volume required (V): {results.hydraulic.volume}</p>
            <p>Length of tank (L): {results.hydraulic.length}</p>
            <p>Volume of one tank (v): {results.hydraulic.tankVolume}</p>
            <p>Area of one tank (A): {results.hydraulic.tankArea}</p>
            <p>Number of tanks required (No): {results.hydraulic.numTanks}</p>

            <h3>Influent Structure</h3>
            <p>Number of influent structures (no): {results.influent.num}</p>
            <p>Spacing of orifices (S’): {results.influent.spacing}</p>

            <h3>Effluent Structure</h3>
            <p>Net outflow (Q’): {results.effluent.outflow}</p>
            <p>Length of weir (L): {results.effluent.weirLength}</p>
            <p>Spacing of launder trough (S’’): {results.effluent.spacing}</p>
            <p>Length of Launder (LL): {results.effluent.launderLength}</p>
          </div>
        )}
      </div>
    </div>
  );
}
