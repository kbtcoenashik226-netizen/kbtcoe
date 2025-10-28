import { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";

export default function FlocculatorDesign() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    projectTitle: "",
    detentionPeriod: "",
    vg: "",
    minDepth: "",
    dip: "",
    nt: "",
    overflowRate: "",
    dt2: "",
    freeBoard: "",
    pwrinp: "",
    ncd: "",
    density: "",
    vtb: "",
    aop: "",
    ns: "",
    nes: "",
    length: "",
    width: "",
    ni: "",
    launders: "",
  });

  const [results, setResults] = useState(null);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateResults = () => {
    // Placeholder calculations; replace with actual formulas
    const Q = 100; // Design average outflow
    const V = 200; // Volume of circular flocculator
    const A = 50;  // Plan area
    const D = 8;   // Diameter

    const Ac = 120; // Surface area of clarifier
    const Dp = 12;  // Diameter of clariflocculator
    const L = 40;   // Length of weir
    const F = 3;    // Weir loading
    const d = 4;    // Depth of tank
    const d1 = 0.5; // Depth for sludge accumulation
    const dtotal = d + d1; // Total depth

    const Ap_calc = 1459.167; // Area of paddle reference
    const a = 5;  // Paddle area
    const s = 3;  // Shaft distance
    const Tno = 12; // Total paddles

    const q = 30;   // Discharge for 1 unit
    const aL = 2;   // Cross-sectional area of launder
    const Pperimeter = 8; // Perimeter
    const Rm = 0.25; // Hydraulic mean radius
    const S = 0.001; // Slope of channel

    setResults({
      Q: Q.toFixed(2), V: V.toFixed(2), A: A.toFixed(2), D: D.toFixed(2),
      Ac: Ac.toFixed(2), Dp: Dp.toFixed(2), L: L.toFixed(2), F: F.toFixed(2), d: d.toFixed(2), d1: d1.toFixed(2), dtotal: dtotal.toFixed(2),
      Ap_calc: Ap_calc.toFixed(2), a: a.toFixed(2), s: s.toFixed(2), Tno: Tno.toFixed(2),
      q: q.toFixed(2), aL: aL.toFixed(2), Pperimeter: Pperimeter.toFixed(2), Rm: Rm.toFixed(2), S: S.toFixed(2),
    });

    localStorage.setItem("flocculatorDesignResults", JSON.stringify({
      Q: Q.toFixed(2), V: V.toFixed(2), A: A.toFixed(2), D: D.toFixed(2),
      Ac: Ac.toFixed(2), Dp: Dp.toFixed(2), L: L.toFixed(2), F: F.toFixed(2), d: d.toFixed(2), d1: d1.toFixed(2), dtotal: dtotal.toFixed(2),
      Ap_calc: Ap_calc.toFixed(2), a: a.toFixed(2), s: s.toFixed(2), Tno: Tno.toFixed(2),
      q: q.toFixed(2), aL: aL.toFixed(2), Pperimeter: Pperimeter.toFixed(2), Rm: Rm.toFixed(2), S: S.toFixed(2),
    }));
  };

  return (
    <div className="page-container">
      <div className="form-box">
        {/* Breadcrumb */}
        <div className="breadcrumb bold">Flocculator Design</div>

        {/* Form container */}
        <div className="form-container">
          <h2 className="form-title blue">Flocculator Design</h2>

          {/* All input fields (unchanged) */}
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={handleChange}
          />
          <Field
            label="Detention Period (t)"
            name="detentionPeriod"
            value={form.detentionPeriod}
            onChange={handleChange}
            help="Normal range 15 to 60 min"
            unit="mins"
          />
          <Field
            label="Velocity Gradient (G)"
            name="vg"
            value={form.vg}
            onChange={handleChange}
            help="Normal range 20 to 80 S⁻¹"
            unit="S⁻¹"
          />
          <Field
            label="Provide a Water Depth (H)"
            name="minDepth"
            value={form.minDepth}
            onChange={handleChange}
            help="max 4.5 m"
            unit="m"
          />
          <Field
            label="Diameter of Inlet Pipe (d)"
            name="dip"
            value={form.dip}
            onChange={handleChange}
            help="Normally 1m & Min 0.5m"
            unit="m"
          />
          <Field
            label="Number of Tanks (n)"
            name="nt"
            value={form.nt}
            onChange={handleChange}
            unit="units"
          />

          <h3 className="form-title blue">Clarifier</h3>
          <Field
            label="Surface Overflow Rate (R)"
            name="overflowRate"
            value={form.overflowRate}
            onChange={handleChange}
            unit="m³/m²/day"
          />
          <Field
            label="Detention period (t)"
            name="dt2"
            value={form.dt2}
            onChange={handleChange}
            unit="hours"
          />
          <Field
            label="Free Board (b)"
            name="freeBoard"
            value={form.freeBoard}
            onChange={handleChange}
            unit="m"
          />

          <h3 className="form-title blue">Dimensions of Paddles</h3>
          <Field
            label="For Volume, Total Power input to Flocculator (P)"
            name="pwrinp"
            value={form.pwrinp}
            onChange={handleChange}
            unit="m³"
          />
          <Field
            label="Newtons Coefficient of Drag (C)"
            name="ncd"
            value={form.ncd}
            onChange={handleChange}
            unit="m"
            help="Normally – 1 m (may vary)"
          />
          <Field
            label="Density Of water at 25 degree C (p)"
            name="density"
            value={form.density}
            onChange={handleChange}
            unit="kg/m³"
          />
          <Field
            label="Velocity of Tip of Blade (v)"
            name="vtb"
            value={form.vtb}
            onChange={handleChange}
            unit="m/s"
          />
          <Field
            label="Area of Paddle (Ap)"
            name="aop"
            value={form.aop}
            onChange={handleChange}
            unit="m²"
          />
          <Field
            label="Number of Shafts Provided (Ns)"
            name="ns"
            value={form.ns}
            onChange={handleChange}
            unit="units"
          />
          <Field
            label="Each Shaft Supports n no. of Paddles (Nes)"
            name="nes"
            value={form.nes}
            onChange={handleChange}
            unit="units"
          />
          <Field
            label="Provide length of each cable (I)"
            name="length"
            value={form.length}
            onChange={handleChange}
            unit="m"
          />
          <Field
            label="Width of each Paddle (w)"
            name="width"
            value={form.width}
            onChange={handleChange}
            unit="m"
          />

          <h3 className="form-title blue">Launder / Collecting Channel (RCC)</h3>
          <Field
            label="Provide n number of Launders (NI)"
            name="ni"
            value={form.ni}
            onChange={handleChange}
            unit="units"
          />
          <Field
            label="Velocity of Flow through Launder (V')"
            name="launders"
            value={form.launders}
            onChange={handleChange}
            unit="m/sec"
          />

          {/* Buttons */}
          <div className="button-row">
            <button type="button" className="secondary-btn" onClick={calculateResults}>
              Calculate
            </button>
            <button type="submit" className="glow-btn" onClick={() => navigate("/Gravity-Filter")}>
              Next
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="results-box">
              <h3 className="form-title blue">Flocculator Design Results</h3>
              <p>Design average outflow (Q): {results.Q} m³/hr</p>
              <p>Volume of circular Flocculator (V): {results.V} m³</p>
              <p>Plan area for flocculator (A): {results.A} m²</p>
              <p>Diameter of flocculator (D): {results.D} m</p>

              <h3>Clarifier</h3>
              <p>Surface area of clarifier (Ac): {results.Ac} m²</p>
              <p>Diameter of clariflocculator (D’): {results.Dp} m</p>
              <p>Length of weir (L): {results.L} m</p>
              <p>Weir loading (F): {results.F} m³/m·day</p>
              <p>Depth of tank (d): {results.d} m</p>
              <p>Depth for sludge accumulation (d1): {results.d1} m</p>
              <p>Total depth at centre of tank (d’): {results.dtotal} m</p>

              <h3>Dimensions of paddles</h3>
              <p>Area of paddle for volume 1459.167 is (Ap): {results.Ap_calc} m²</p>
              <p>Paddle area (a): {results.a} m²</p>
              <p>Shaft distance from central line of clariflocculator (s): {results.s} m</p>
              <p>Total no of paddles (Tno): {results.Tno}</p>

              <h3>Launder / Collecting channel (RCC)</h3>
              <p>Discharge flow for 1 unit (q): {results.q} m³/hr</p>
              <p>Cross sectional area of each launder (a’): {results.aL} m²</p>
              <p>Perimeter of launder (P): {results.Pperimeter} m</p>
              <p>Hydraulic mean radius (R): {results.Rm}</p>
              <p>Slope of channel (S): {results.S}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
