import { useState } from "react";
import { Field } from "./Field";
import { useNavigate } from "react-router-dom";

export default function GravityFilter() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        projectTitle: "",
        lostTime: "",
        whfd: "",
        rf: "",
        lwr: "",
        sop: "",
        si: "",
        qi: "",
        d1: "",
        d2: "",
        d3: "",
        d6: "",
        w: "",
        l: "",
        rw: "",
        st: "",
        wot: "",
        bt: "",
        btsb: "",
        h: "",
        q: "",
        qb: "",
        tb: "",
    });

    const [results, setResults] = useState(null);

    const handleChange = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const calculateResults = () => {
        // Convert inputs to numbers
        const tLost = parseFloat(form.overflowRate) || 0; // Time lost during backwash
        const T = parseFloat(form.pumpingHours) || 22; // Working hours per day
        const R = parseFloat(form.detentionPeriod) || 5; // Rate of filtration (m³/m²/day)
        const w = parseFloat(form.widthTank) || 5; // Width of filter bed
        const l = parseFloat(form.influentWidth) || 20; // Length of filter bed
        const d1 = parseFloat(form.minDepth) || 0.6; // Sand depth
        const d2 = parseFloat(form.influentDepth) || 1.5; // Water depth while filtering
        const d3 = parseFloat(form.effectiveDepth) || 0.7; // Backwashing depth
        const d6 = parseFloat(form.freeBoard) || 0.5; // Freeboard
        const Qb = parseFloat(form.orificeDepth) || 2; // Flow for backwash
        const Tb = parseFloat(form.launders) || 10; // Backwash duration
        const h = parseFloat(form.weirLoading) || 60; // Rise/min backwash rate
        const q = parseFloat(form.launderWidth) || 2; // Flow per filter bed

        // -----------------------------
        // 1. Filter bed dimension
        // -----------------------------
        const Q1 = ((T * 60 - tLost) / (T * 60)) * (R * w * l); // Design flow accounting backwash
        const A = w * l; // Area of filter
        const no = Math.ceil(Q1 / (R * A)); // Number of filter beds
        const A1 = A / no; // Area of each filter

        // -----------------------------
        // 2. Under-drainage system
        // -----------------------------
        const perforationDiameter = parseFloat(form.ratioH) || 0.01; // Spacing diameter of perforations
        const a = Math.PI * (perforationDiameter / 2) ** 2; // Total area of one perforation
        const num = Math.ceil(A1 / a); // Total number of perforations
        const aL = num * a * 0.5; // Total c/s area of laterals (approx.)
        const Am = 0.3; // Area of central manifold (m², example value)
        const Qm = 0.25; // Diameter of manifold (m, example value)
        const lateralSpacing = parseFloat(form.ratioV) || 0.15;
        const Nl = Math.ceil(w / lateralSpacing); // Laterals on one side
        const Nbl = Nl * 2; // Both sides
        const Tnl = Nbl; // Total laterals
        const Tm = 1; // Number of manifolds per filter
        const Sm = 1.5; // Spacing of manifold along width
        const Ll = l; // Length of lateral
        const Np = Math.ceil(num / Nl); // Perforations per lateral
        const Sp = (w - Nl * perforationDiameter) / (Nl - 1); // Spacing along width

        // -----------------------------
        // 3. Wash water trough
        // -----------------------------
        const Qw = Q1 / no; // Wash water discharge per filter
        const Nt = no; // Total troughs
        const Qt = Qw / Nt; // Discharge per unit trough
        const Dt = Math.pow(Qt / 1.376, 2 / 3); // Trough depth formula
        const dut = Dt + 0.1; // Water depth with freeboard

        // -----------------------------
        // 4. Total depth of filter box
        // -----------------------------
        const d5 = d1 + d2 + d3 + d6;

        // -----------------------------
        // 5. Main gutter
        // -----------------------------
        const b = Math.pow(q / 1.376, 2 / 3); // Width of main gutter

        // -----------------------------
        // 6. Wash water tank
        // -----------------------------
        const V = Qb * Tb * no; // Volume of tank
        const No_Tank = no; // Number of tanks

        setResults({
            Q1: Q1.toFixed(2),
            A: A.toFixed(2),
            no: no,
            A1: A1.toFixed(2),

            a: a.toFixed(4),
            num: num,
            aL: aL.toFixed(4),
            Am: Am,
            Qm: Qm,
            Nl: Nl,
            Nbl: Nbl,
            Tnl: Tnl,
            Tm: Tm,
            Sm: Sm,
            Ll: Ll,
            Np: Np,
            Sp: Sp.toFixed(2),

            Qw: Qw.toFixed(2),
            Nt: Nt,
            Qt: Qt.toFixed(2),
            Dt: Dt.toFixed(2),
            dut: dut.toFixed(2),

            d5: d5.toFixed(2),
            h: h,
            q: q,
            b: b.toFixed(2),

            V: V.toFixed(2),
            No_Tank: No_Tank,
        });

        localStorage.setItem("gravityFilterResults", JSON.stringify({
            Q1: Q1.toFixed(2),
            A: A.toFixed(2),
            no: no,
            A1: A1.toFixed(2),

            a: a.toFixed(4),
            num: num,
            aL: aL.toFixed(4),
            Am: Am,
            Qm: Qm,
            Nl: Nl,
            Nbl: Nbl,
            Tnl: Tnl,
            Tm: Tm,
            Sm: Sm,
            Ll: Ll,
            Np: Np,
            Sp: Sp.toFixed(2),

            Qw: Qw.toFixed(2),
            Nt: Nt,
            Qt: Qt.toFixed(2),
            Dt: Dt.toFixed(2),
            dut: dut.toFixed(2),

            d5: d5.toFixed(2),
            h: h,
            q: q,
            b: b.toFixed(2),

            V: V.toFixed(2),
            No_Tank: No_Tank,
        }));
    };

    return (
        <div className="page-container">
            <div className="form-box">
                <div className="breadcrumb bold">Gravity Filter</div>
                <div className="form-container">
                    <h2 className="form-title blue">Rapid sand Gravity Filter</h2>

                    {/* All original inputs */}
                    <Field label="Project Title" name="projectTitle" value={form.projectTitle} onChange={handleChange} />
                    <Field label="Time Lost During backwashing (t')" name="lostTime" value={form.lostTime} onChange={handleChange} unit="mins" help="Normal Value min 30 - 10 min" />
                    <Field label="Working hours of Filter per day (T)" name="whfd" value={form.whfd} onChange={handleChange} unit="hours" help="Between 22 - 23.5 hours" />
                    <Field label="Rate of Filtration (R)" name="rf" value={form.rf} onChange={handleChange} unit="m³/m²/day" help="Normal range 4 - 7 m³/m²/day" />
                    <Field label="Length:Width Ratio" name="lwr" value={form.lwr} onChange={handleChange} help="Normal range 1:25 - 1:33:1" />
                    <Field label="Size of Perforation (Qp)" name="sop" value={form.sop} onChange={handleChange} unit="mm" help="Normal range 8 - 15 mm" />

                    <h3 className="form-title blue">Design of Under-drainage Syatem</h3>
                    <Field label="Assume Spacing for laterals (SI)" name="si" value={form.si} onChange={handleChange} unit="m" help="Normally – 0.15mm (may vary)" />
                    <Field label="Assume Diameter of Lateral (QI)" name="qi" value={form.qi} onChange={handleChange} unit="m" help="Min 0.06mm & may vary" />

                    <h3 className="form-title blue">Computing Total Depth of Filter Box</h3>
                    <Field label="Minimum depth required for sand is given by Hudson's Formula in Metric Unit (d1)" name="d1" value={form.d1} onChange={handleChange} unit="m" help="Normally 0.6 m – 0.75 m" />
                    <Field label="Depth of Water while Filtering (d2)" name="d2" value={form.d2} onChange={handleChange} unit="m" help="Normally 1m - 2m" />
                    <Field label="Depth of Water while Backwashing (d3)" name="d3" value={form.d3} onChange={handleChange} unit="m" help="Min 0.6m (may vary)" />
                    <Field label="Free Board for Rapid Gravity Filter (d6)" name="d6" value={form.d6} onChange={handleChange} unit="m" help="Min 0.5m (may vary)" />

                    <h3 className="form-title blue">Filter Bed Dimension</h3>
                    <Field label="Provide width of Filter bed (w)" name="w" value={form.w} onChange={handleChange} unit="m" />
                    <Field label="Provide length of Filter bed (l)" name="l" value={form.l} onChange={handleChange} unit="m" />

                    <h3 className="form-title blue">Design of Wash Water Trough</h3>
                    <Field label="Assume Wash water rate (Rw)" name="rw" value={form.rw} onChange={handleChange} unit="m³/m²/hour" help="Range 20 - 40 m³/m²/hour" />
                    <Field label="Assume Spacing for wash Water trough along width of filter (St)" name="st" value={form.st} onChange={handleChange} unit="m" help="Normally 1.4 (may vary)" />
                    <Field label="Assume Width of Trough (Wt)" name="wot" value={form.wot} onChange={handleChange} unit="m" help="Normally 0.4m (may vary)" />
                    <Field label="Assume Free board for trough (bt)" name="bt" value={form.bt} onChange={handleChange} unit="m" help="Min 1.4m" />
                    <Field label="Bottom of trough from Sand Bed is given as" name="btsb" value={form.btsb} onChange={handleChange} unit="m" help="Min 0.5m (may vary)" />

                    <h3 className="form-title blue">Main Gutter</h3>
                    <Field label="Assume rise/min backwash rate (h)" name="h" value={form.h} onChange={handleChange} unit="m/min" help="Normal 60m/min" />
                    <Field label="Flow per Filter bed considering wash water rate (q)" name="q" value={form.q} onChange={handleChange} unit="m³/sec" />

                    <h3 className="form-title blue">Wash Water Tank</h3>
                    <Field label="Required Flow for Backwash (Qb)" name="qb" value={form.qb} onChange={handleChange} unit="m³/m²/min" />
                    <Field label="Duration of Backwash for 2 Filter bed (Tb)" name="tb" value={form.tb} onChange={handleChange} unit="min" />

                    {/* Buttons */}
                    <div className="button-row">
                        <button type="button" className="secondary-btn" onClick={calculateResults}>Calculate</button>
                        <button type="submit" className="glow-btn" onClick={() => navigate("/Chlorinator")}>Next</button>
                    </div>

                    {/* Display Results */}
                    {results && (
                        <div className="results-box">
                            <h3>Results</h3>
                            <p>Design flow for filter (Q1): {results.Q1} m³/day</p>
                            <p>Area of filter (A): {results.A} m²</p>
                            <p>Number of filters (no): {results.no}</p>
                            <p>Area of each filter (A'): {results.A1} m²</p>
                            <p>Total area of perforation (a): {results.a} m²</p>
                            <p>Total number of perforations (num): {results.num}</p>
                            <p>Total c/s area of laterals (a'): {results.aL} m²</p>
                            <p>Area of central manifold (Am): {results.Am} m²</p>
                            <p>Diameter of manifold (Qm): {results.Qm} m</p>
                            <p>Number of laterals on one side (Nl): {results.Nl}</p>
                            <p>Laterals on both sides (Nbl): {results.Nbl}</p>
                            <p>Total number of required laterals (Tnl): {results.Tnl}</p>
                            <p>Total Number of manifolds (Tm): {results.Tm}</p>
                            <p>Spacing of manifold (Sm): {results.Sm} m</p>
                            <p>Length of each lateral (Ll): {results.Ll} m</p>
                            <p>Number of perforations per lateral (Np): {results.Np}</p>
                            <p>Spacing of perforators along width (Sp): {results.Sp} m</p>
                            <p>Wash water discharge for 1 filter (Qw): {results.Qw} m³/day</p>
                            <p>Total number of trough (Nt): {results.Nt}</p>
                            <p>Discharge per unit trough (Qt): {results.Qt} m³/day</p>
                            <p>Trough depth (Dt): {results.Dt} m</p>
                            <p>Water depth at upper end in trough (dut): {results.dut} m</p>
                            <p>Depth of underdrainage system (d5): {results.d5} m</p>
                            <p>Rise/min backwash rate (h): {results.h} m/min</p>
                            <p>Flow per filter bed considering wash water rate (q): {results.q} m³/sec</p>
                            <p>Width of main gutter (b): {results.b} m</p>
                            <p>Volume of tank (V): {results.V} m³</p>
                            <p>Total no of tanks (No_Tank): {results.No_Tank}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
