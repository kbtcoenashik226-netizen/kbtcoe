import { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";

export default function AerationUnit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    projectTitle: "",
    headRequired: "",
    noOfTrays: "",
    riseOfTray: "",
    spaceRequirement: "",
  });

  const [results, setResults] = useState(null);

  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  // Calculation function
  const calculateAeration = () => {
    const Q = 13; // MLD (constant)
    const V = 0.75; // m/sec (constant)

    const n = parseFloat(form.noOfTrays) || 1;
    const S = parseFloat(form.spaceRequirement) || 0.02;

    // Required discharge per hour
    const Qp = (Q * 1000) / 24; // m³/hr

    // Diameter of inner pipe
    const Di = Math.sqrt((Qp * 4) / (V * Math.PI * 3600)); // m

    // Provide Area at Tray
    const A = Qp * S; // m²

    // Diameter of bottom tray
    const Db = Math.sqrt((A * 4) / Math.PI) + A; // m

    // Tread of tray
    const t = (Db - Di) / (2 * n); // m

    setResults({
      Qp: Qp.toFixed(2),
      Di: Di.toFixed(3),
      A: A.toFixed(3),
      Db: Dp.toFixed(3),
      t: t.toFixed(3),
    });

    localStorage.setItem("aerationUnitResults", JSON.stringify({
      Qp: Qp.toFixed(2),
      Di: Di.toFixed(3),
      A: A.toFixed(3),
      Db: Dp.toFixed(3),
      t: t.toFixed(3),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Aeration Unit</div>

        <form onSubmit={handleSubmit} className="form-container">
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={setField}
            help="Enter your project title."
          />

          <Field
            label="Head required (h)"
            name="headRequired"
            value={form.headRequired}
            onChange={setField}
            unit="m"
            help="Normal range 0.5 - 3m"
            type="number"
          />

          <Field
            label="Number of Trays (n)"
            name="noOfTrays"
            value={form.noOfTrays}
            onChange={setField}
            unit="units"
            help="Normal range 4 - 6 no's"
            type="number"
          />

          <Field
            label="Rise of Tray (R)"
            name="riseOfTray"
            value={form.riseOfTray}
            onChange={setField}
            unit="m"
            help="It is found from the head requirement of Aerator"
            type="number"
          />

          <Field
            label="Space Requirement (S)"
            name="spaceRequirement"
            value={form.spaceRequirement}
            onChange={setField}
            unit="m²/m³/hour"
            help="Normal range 0.015 to 0.045 m²/m³/hour"
            type="number"
          />

          {/* Buttons */}
          <div className="button-row">
            <button
              type="button"
              className="secondary-btn"
              onClick={calculateAeration}
            >
              Calculate
            </button>
            <button
              type="submit"
              className="glow-btn"
              onClick={() => navigate("/rapid-mix")}
            >
              Next
            </button>
          </div>
        </form>

        {/* Results Section */}
        {results && (
          <div className="results-box">
            <h2 className="form-title blue">Results</h2>

            <p>Required Discharge per Hour (Q’): {results.Qp} m³/hr</p>
            <p>Diameter of inner pipe (Di): {results.Di} m</p>
            <p>Provide Area at Tray (A): {results.A} m²</p>
            <p>Diameter of bottom tray (Db): {results.Db} m</p>
            <p>Tread of Tray (t): {results.t} m</p>
          </div>
        )}
      </div>
    </div>
  );
}
