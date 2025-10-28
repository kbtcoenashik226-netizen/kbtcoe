// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.post("/final-report", async (req, res) => {
//   try {
//     const { waterDemand, intakeWell, pumpDesign, preSedimentation, aerationUnit, rapidMix, alumDose, flocculatorDesign, gravityFilter, chlorinator, clearWaterTank } = req.body;

//     // 🧮 Water Demand Calculations
//     let wdSection = [];
//     if (waterDemand && waterDemand.Pn) {
//       wdSection = [
//         new Paragraph({ text: "Water Demand Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Future Population (Pn): ${waterDemand.Pn}` }),
//         new Paragraph({ text: `Water Demand (WD): ${waterDemand.WD} MLD` }),
//         new Paragraph({ text: `Fire Demand (Fd): ${waterDemand.Fd} MLD` }),
//         new Paragraph({ text: `Total Discharge (Q): ${waterDemand.Q} MLD` }),
//         new Paragraph({ text: `After 3% Loss (q1): ${waterDemand.q1} MLD` }),
//         new Paragraph({ text: `After 2% Loss (q2): ${waterDemand.q2} MLD` }),
//         new Paragraph({ text: `After 2% Loss (q3): ${waterDemand.q3} MLD` }),
//       ];
//     }

//     // ⚙️ Pump Design
//     let pdSection = [];
//     if (pumpDesign && pumpDesign.d) {
//       pdSection = [
//         new Paragraph({ text: "Pump Design Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Diameter of Pipe (d): ${pumpDesign.d} m` }),
//         new Paragraph({ text: `Number of Pumps (Np): ${pumpDesign.Np}` }),
//         new Paragraph({ text: `Total Pumps (Nt): ${pumpDesign.Nt}` }),
//         new Paragraph({ text: `Clearance Between Pumps (S): ${pumpDesign.S} m` }),
//       ];
//     }

//     // 🏗️ Pre-Sedimentation Tank Section
//     let preSedimentationContent = [];
//     if (preSedimentation && preSedimentation.hydraulic) {
//       preSedimentationContent = [
//         new Paragraph({ text: "Pre-Sedimentation Tank Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Overflow Rate (Q): ${preSedimentation.general?.overflowRate || "N/A"}` }),
//         new Paragraph({ text: `Minimum Side Water Depth (h): ${preSedimentation.general?.minDepth || "N/A"}` }),
//         new Paragraph({ text: `Total Inflow (Q’): ${preSedimentation.hydraulic?.inflow || "N/A"}` }),
//         new Paragraph({ text: `Discharge per Hour (q): ${preSedimentation.hydraulic?.discharge || "N/A"}` }),
//         new Paragraph({ text: `Total Volume (V): ${preSedimentation.hydraulic?.volume || "N/A"}` }),
//         new Paragraph({ text: `Length of Tank (L): ${preSedimentation.hydraulic?.length || "N/A"}` }),
//         new Paragraph({ text: `Volume of One Tank (v): ${preSedimentation.hydraulic?.tankVolume || "N/A"}` }),
//         new Paragraph({ text: `Area of One Tank (A): ${preSedimentation.hydraulic?.tankArea || "N/A"}` }),
//         new Paragraph({ text: `Number of Tanks Required (No): ${preSedimentation.hydraulic?.numTanks || "N/A"}` }),
//         new Paragraph({ text: `Number of Influent Structures (no): ${preSedimentation.influent?.num || "N/A"}` }),
//         new Paragraph({ text: `Spacing of Orifices (S’): ${preSedimentation.influent?.spacing || "N/A"}` }),
//         new Paragraph({ text: `Net Outflow (Q’): ${preSedimentation.effluent?.outflow || "N/A"}` }),
//         new Paragraph({ text: `Length of Weir (L): ${preSedimentation.effluent?.weirLength || "N/A"}` }),
//         new Paragraph({ text: `Spacing of Launder Troughs (S’’): ${preSedimentation.effluent?.spacing || "N/A"}` }),
//         new Paragraph({ text: `Length of Launder (LL): ${preSedimentation.effluent?.launderLength || "N/A"}` }),
//       ];
//     }

//     // 🌬️ Aeration Unit Section
//     let aerationUnitContent = [];
//     if (aerationUnit && aerationUnit.Qp) {
//       aerationUnitContent = [
//         new Paragraph({ text: "Aeration Unit Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Required Discharge per Hour (Q’): ${aerationUnit.Qp} m³/hr` }),
//         new Paragraph({ text: `Diameter of Inner Pipe (Di): ${aerationUnit.Di} m` }),
//         new Paragraph({ text: `Provide Area at Tray (A): ${aerationUnit.A} m²` }),
//         new Paragraph({ text: `Diameter of Bottom Tray (Db): ${aerationUnit.Db} m` }),
//         new Paragraph({ text: `Tread of Tray (t): ${aerationUnit.t} m` }),
//       ];
//     }

//     // ⚡ Rapid Mix Section
//     let rmSection = [];
//     if (rapidMix && rapidMix.Qp) {
//       rmSection = [
//         new Paragraph({ text: "Rapid Mix Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Design Flow (Q’): ${rapidMix.Qp} m³/hr` }),
//         new Paragraph({ text: `Capacity of Tank (C): ${rapidMix.C} m³` }),
//         new Paragraph({ text: `Diameter of Tank (D): ${rapidMix.D} m` }),
//         new Paragraph({ text: `Volume of Tank (V): ${rapidMix.V} m³` }),
//         new Paragraph({ text: `Number of Units (no): ${rapidMix.no}` }),
//         new Paragraph({ text: `Required Motor Power (HP): ${rapidMix.HP} HP` }),
//         new Paragraph({ text: `Diameter of Impeller (d): ${rapidMix.d} m` }),
//       ];
//     }

//     // Alum Dose Section
//     let ads = [];
//     if (alumDose && alumDose.R) {
//       ads = [
//         new Paragraph({ text: "Alum Dose Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Alum Required per Hour (R): ${alumDose.R} g/hr` }),
//         new Paragraph({ text: `Alum required per day (W): ${alumDose.W} kg/day` }),
//         new Paragraph({ text: `Total Alum required for n months (Wt): ${alumDose.Wt} kg` }),
//         new Paragraph({ text: `Volume of tank (V1): ${alumDose.V1} m³` }),
//         new Paragraph({ text: `Volume for Provision of drainage, mixing, and stirring (V2): ${alumDose.V2} m³` }),
//         new Paragraph({ text: `Total volume (V): ${alumDose.V} m³` }),
//         new Paragraph({ text: `Diameter of tank (dia): ${alumDose.dia} m` }),
//         new Paragraph({ text: `Square Platform with one side (l): ${alumDose.l} m` }),
//       ];
//     }

//     // Flocculator Design Section
//     let fds = []
//     if (flocculatorDesign && flocculatorDesign.Q) {
//       fds = [
//         new Paragraph({ text: "Flocculator Design Results Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Design average outflow (Q): ${flocculatorDesign.Q} m³/hr` }),
//         new Paragraph({ text: `Volume of circular Flocculator (V): ${flocculatorDesign.V} m³` }),
//         new Paragraph({ text: `Plan area for flocculator (A): ${flocculatorDesign.A} m²` }),
//         new Paragraph({ text: `Diameter of flocculator (D): ${flocculatorDesign.D} m` }),

//         new Paragraph({ text: "Clarifier", heading: HeadingLevel.HEADING_3 }),
//         new Paragraph({ text: `Surface area of clarifier (Ac): ${flocculatorDesign.Ac} m²` }),
//         new Paragraph({ text: `Diameter of clariflocculator (D’): ${flocculatorDesign.Dp} m` }),
//         new Paragraph({ text: `Length of weir (L): ${flocculatorDesign.L} m` }),
//         new Paragraph({ text: `Weir loading (F): ${flocculatorDesign.F} m³/m·day` }),
//         new Paragraph({ text: `Depth of tank (d): ${flocculatorDesign.d} m` }),
//         new Paragraph({ text: `Depth for sludge accumulation (d1): ${flocculatorDesign.d1} m` }),
//         new Paragraph({ text: `Total depth at centre of tank (d’): ${flocculatorDesign.dtotal} m` }),

//         new Paragraph({ text: "Dimensions of paddles", heading: HeadingLevel.HEADING_3 }),
//         new Paragraph({ text: `Area of paddle for volume 1459.167 is (Ap): ${flocculatorDesign.Ap_calc} m²` }),
//         new Paragraph({ text: `Paddle area (a): ${flocculatorDesign.a} m²` }),
//         new Paragraph({ text: `Shaft distance from central line of clariflocculator (s): ${flocculatorDesign.s} m` }),
//         new Paragraph({ text: `Total no of paddles (Tno): ${flocculatorDesign.Tno}` }),

//         new Paragraph({ text: "Launder / Collecting channel (RCC)", heading: HeadingLevel.HEADING_3 }),
//         new Paragraph({ text: `Discharge flow for 1 unit (q): ${flocculatorDesign.q} m³/hr` }),
//         new Paragraph({ text: `Cross sectional area of each launder (a’): ${flocculatorDesign.aL} m²` }),
//         new Paragraph({ text: `Perimeter of launder (P): ${flocculatorDesign.Pperimeter} m` }),
//         new Paragraph({ text: `Hydraulic mean radius (R): ${flocculatorDesign.Rm}` }),
//         new Paragraph({ text: `Slope of channel (S): ${flocculatorDesign.S}` }),
//       ];
//     }

//     // Gravity Filter Calculation
//     let gf = [];
//     if (gravityFilter && gravityFilter.Q1) {
//       gf = [
//         new Paragraph({ text: "Gravity Filter Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Design flow for filter (Q1): ${gravityFilter.Q1} m³/day` }),
//         new Paragraph({ text: `Area of filter (A): ${gravityFilter.A} m²` }),
//         new Paragraph({ text: `Number of filters (no): ${gravityFilter.no} ` }),
//         new Paragraph({ text: `Area of each filter (A'): ${gravityFilter.A1} m²` }),
//         new Paragraph({ text: `Total area of perforation (a): ${gravityFilter.a} m²` }),
//         new Paragraph({ text: `Total number of perforations (num): ${gravityFilter.num} ` }),
//         new Paragraph({ text: `Total c/s area of laterals (a'): ${gravityFilter.aL} m²` }),
//         new Paragraph({ text: `Area of central manifold (Am): ${gravityFilter.Am} m²` }),
//         new Paragraph({ text: `Diameter of manifold (Qm): ${gravityFilter.Qm} m` }),
//         new Paragraph({ text: `Number of laterals on one side (Nl): ${gravityFilter.Nl} ` }),
//         new Paragraph({ text: `Laterals on both sides (Nbl): ${gravityFilter.Nbl} ` }),
//         new Paragraph({ text: `Total number of required laterals (Tnl): ${gravityFilter.Tnl} ` }),
//         new Paragraph({ text: `Total Number of manifolds (Tm): ${gravityFilter.Tm} ` }),
//         new Paragraph({ text: `Spacing of manifold (Sm): ${gravityFilter.Sm} m` }),
//         new Paragraph({ text: `Length of each lateral (Ll): ${gravityFilter.Ll} m` }),
//         new Paragraph({ text: `Number of perforations per lateral (Np): ${gravityFilter.Np} ` }),
//         new Paragraph({ text: `Spacing of perforators along width (Sp): ${gravityFilter.Sp} m` }),
//         new Paragraph({ text: `Wash water discharge for 1 filter (Qw): ${gravityFilter.Qw} m³/day` }),
//         new Paragraph({ text: `Total number of trough (Nt): ${gravityFilter.Nt} ` }),
//         new Paragraph({ text: `Discharge per unit trough (Qt): ${gravityFilter.Qt} m³/day` }),
//         new Paragraph({ text: `Trough depth (Dt): ${gravityFilter.Dt} m` }),
//         new Paragraph({ text: `Water depth at upper end in trough (dut): ${gravityFilter.dut} m` }),
//         new Paragraph({ text: `Depth of underdrainage system (d5): ${gravityFilter.d5} m` }),
//         new Paragraph({ text: `Rise/min backwash rate (h): ${gravityFilter.h} m/min` }),
//         new Paragraph({ text: `Flow per filter bed considering wash water rate (q): ${gravityFilter.q} m³/sec` }),
//         new Paragraph({ text: `Width of main gutter (b): ${gravityFilter.b} m` }),
//         new Paragraph({ text: `Volume of tank (V): ${gravityFilter.V} m³` }),
//         new Paragraph({ text: `Total no of tanks (No_Tank): ${gravityFilter.No_Tank} ` }),
//       ];
//     }

//     // Chlorinator Section
//     let chl = [];
//     if (chlorinator && chlorinator.totalChlorineApplied) {
//       chl = [
//         new Paragraph({ text: "Chlorinator Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Total Liquid Chlorine applied (ppm): ${chlorinator.totalChlorineApplied} mg/h` }),
//         new Paragraph({ text: `Liquid chlorine required per hour (R): ${chlorinator.R} mg/day` }),
//         new Paragraph({ text: `Chlorine per day (W): ${chlorinator.W} mg` }),
//         new Paragraph({ text: `Total Chlorine required (Wt): ${chlorinator.Wt} m³` }),
//         new Paragraph({ text: `Volume of tank (V1): ${chlorinator.V1} m³` }),
//         new Paragraph({ text: `Volume for Provision of drainage, mixing, and stirring (V2): ${chlorinator.V2} m³` }),
//         new Paragraph({ text: `Total volume (V): ${chlorinator.totalVolume} m³` }),
//         new Paragraph({ text: `Diameter of tank (Dia): ${chlorinator.Dia} m` }),
//         new Paragraph({ text: `Square Platform with one side (l): ${chlorinator.l} m` }),
//       ];
//     }

//     // Clear Water Tank Section
//     let cwtSection = [];
//     if (clearWaterTank && clearWaterTank.A) {
//       cwtSection = [
//         new Paragraph({ text: "Clear Water Tank Report", heading: HeadingLevel.HEADING_1 }),
//         new Paragraph({ text: `Cross Sectional Area (A): ${clearWaterTank.A} m²` }),
//         new Paragraph({ text: `Diameter (d): ${clearWaterTank.diameter} m` }),
//       ];
//     }

//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             ...wdSection,
//             ...iwSection,
//             ...pdSection,
//             ...preSedimentationContent,
//             ...aerationUnitContent,
//             ...rmSection,
//             ...ads,
//             ...fds,
//             ...gf,
//             ...chl,
//             ...cwtSection,
//           ],
//         },
//       ],
//     });

//     const buffer = await Packer.toBuffer(doc);
//     res.setHeader("Content-Disposition", "attachment; filename=ProjectReport.docx");
//     res.setHeader(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     );
//     res.send(buffer);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).send("Error generating report");
//   }
// });

// app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));






import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/final-report", async (req, res) => {
  try {
    const {
      waterDemand,
      intakeWell,
      pumpDesign,
      presedimentationTank,
      aerationUnit,
      rapidMix,
      clearWaterTank,
      alumDose,
      flocculatorDesign,
      gravityFilter,
      chlorinator,
    } = req.body;

    const makeHeading = (text) =>
      new Paragraph({ text, heading: HeadingLevel.HEADING_1 });

    const makeSubHeading = (text) =>
      new Paragraph({
        children: [new TextRun({ text, bold: true, break: 1 })],
      });

    const makeFormula = (formula) =>
      new Paragraph({
        children: [
          new TextRun({
            text: formula,
            font: "Courier New",
            italics: true,
          }),
        ],
      });

    // 🌊 WATER DEMAND
    let wdSection = [];
    if (waterDemand && waterDemand.Pn) {
      wdSection = [
        makeHeading("Water Demand Report"),
        makeSubHeading("📘 Formulas Used:"),
        makeFormula("Pn = P₀ × (1 + r/100)ⁿ"),
        makeFormula("WD = (Pn × per capita demand) / 1,000,000 (MLD)"),
        makeFormula("Fd = (100 × √(Pn / 1000)) / 1000 (MLD)"),
        makeFormula("Q = WD + Fd (MLD)"),
        makeFormula("q₁ = Q − 3% of Q"),
        makeFormula("q₂ = q₁ − 2% of q₁"),
        makeFormula("q₃ = q₂ − 2% of q₂"),
        makeSubHeading("📊 Results:"),
        new Paragraph({ text: `Future Population (Pn): ${waterDemand.Pn}` }),
        new Paragraph({ text: `Water Demand (WD): ${waterDemand.WD} MLD` }),
        new Paragraph({ text: `Fire Demand (Fd): ${waterDemand.Fd} MLD` }),
        new Paragraph({ text: `Total Discharge (Q): ${waterDemand.Q} MLD` }),
        new Paragraph({ text: `After 3% Loss (q1): ${waterDemand.q1} MLD` }),
        new Paragraph({ text: `After 2% Loss (q2): ${waterDemand.q2} MLD` }),
        new Paragraph({ text: `After 2% Loss (q3): ${waterDemand.q3} MLD` }),
      ];
    }

    // 💧 INTAKE WELL
    let iwSection = [];
    if (intakeWell && intakeWell.Q) {
      iwSection = [
        makeHeading("Intake Well Report"),
        makeSubHeading("📘 Formulas Used:"),
        makeFormula("Q = (Q' × 1000) / (24 × 60 × 60)"),
        makeFormula("A = Q / V"),
        makeFormula("Ah = 2 × A"),
        makeFormula("Area of One Screen = Ah / 2"),
        makeFormula("h = (Area of One Screen) / W"),
        makeSubHeading("📊 Results:"),
        new Paragraph({ text: `Discharge per Second (Q): ${intakeWell.Q} m³/sec` }),
        new Paragraph({ text: `Area for Opening (A): ${intakeWell.A} m²` }),
        new Paragraph({ text: `Total Opening Area (Ah): ${intakeWell.Ah} m²` }),
        new Paragraph({ text: `Area of One Screen: ${intakeWell.oneScreenArea} m²` }),
        new Paragraph({ text: `Height of Screen (h): ${intakeWell.h} m` }),
      ];
    }

    // ⚙️ PUMP DESIGN
    let pdSection = [];
    if (pumpDesign && pumpDesign.d) {
      pdSection = [
        makeHeading("Pump Design Report"),
        makeSubHeading("📘 Formulas Used:"),
        makeFormula("d = √((4 × Q) / (π × V))"),
        makeFormula("Np = (Q × 1000) / (Pump Capacity × 86.4)"),
        makeFormula("Nt = Np + 1 (one standby pump)"),
        makeFormula("S = (0.75 × d) + 0.3"),
        makeSubHeading("📊 Results:"),
        new Paragraph({ text: `Diameter of Pipe (d): ${pumpDesign.d} m` }),
        new Paragraph({ text: `Number of Pumps (Np): ${pumpDesign.Np}` }),
        new Paragraph({ text: `Total Pumps (Nt): ${pumpDesign.Nt}` }),
        new Paragraph({ text: `Clearance Between Pumps (S): ${pumpDesign.S} m` }),
      ];
    }

    // 🧱 PRESEDIMENTATION TANK
    let psSection = [];
    if (presedimentationTank && presedimentationTank.V) {
      psSection = [
        makeHeading("Presedimentation Tank Report"),
        makeSubHeading("📘 Formulas Used:"),
        makeFormula("Q = (Demand × 10⁶) / (24 × 60 × 60)"),
        makeFormula("V = Q × Detention Time (m³)"),
        makeFormula("B = √(V / L)"),
        makeFormula("D = V / (L × B)"),
        makeSubHeading("📊 Results:"),
        new Paragraph({ text: `Volume (V): ${presedimentationTank.V} m³` }),
        new Paragraph({ text: `Length (L): ${presedimentationTank.L} m` }),
        new Paragraph({ text: `Width (B): ${presedimentationTank.B} m` }),
        new Paragraph({ text: `Depth (D): ${presedimentationTank.D} m` }),
      ];
    }

    // 🌬️ AERATION UNIT
    let auSection = [];
    if (aerationUnit && aerationUnit.Qp) {
      auSection = [
        makeHeading("Aeration Unit Report"),
        makeSubHeading("📘 Formulas Used:"),
        makeFormula("Q’ = (Demand × 10⁶) / 24"),
        makeFormula("A = (Q’) / (π × (Di)² / 4)"),
        makeFormula("Db = √(4 × A / π)"),
        makeFormula("t = Db / 10"),
        makeSubHeading("📊 Results:"),
        new Paragraph({ text: `Discharge per Hour (Q’): ${aerationUnit.Qp} m³/hr` }),
        new Paragraph({ text: `Inner Pipe Diameter (Di): ${aerationUnit.Di} m` }),
        new Paragraph({ text: `Tray Area (A): ${aerationUnit.A} m²` }),
        new Paragraph({ text: `Bottom Tray Diameter (Db): ${aerationUnit.Db} m` }),
        new Paragraph({ text: `Tray Tread (t): ${aerationUnit.t} m` }),
      ];
    }

    // ⚡ RAPID MIX
    let rmSection = [];
    if (rapidMix && rapidMix.Qp) {
      rmSection = [
        makeHeading("Rapid Mix Report"),
        makeSubHeading("📘 Formulas Used:"),
        makeFormula("Q’ = (Q × 10⁶) / 24"),
        makeFormula("C = Q’ × Detention Time / 60"),
        makeFormula("D = √(4 × C / (π × H))"),
        makeFormula("HP = (P × N × 9.81 × 10⁻³) / Efficiency"),
        makeSubHeading("📊 Results:"),
        new Paragraph({ text: `Design Flow (Q’): ${rapidMix.Qp} m³/hr` }),
        new Paragraph({ text: `Tank Capacity (C): ${rapidMix.C} m³` }),
        new Paragraph({ text: `Tank Diameter (D): ${rapidMix.D} m` }),
        new Paragraph({ text: `Tank Volume (V): ${rapidMix.V} m³` }),
        new Paragraph({ text: `No. of Units: ${rapidMix.no}` }),
        new Paragraph({ text: `Motor Power (HP): ${rapidMix.HP} HP` }),
        new Paragraph({ text: `Impeller Diameter (d): ${rapidMix.d} m` }),
      ];
    }

    // 🧪 ALUM DOSE
    let ads = [];
    if (alumDose && alumDose.R) {
      ads = [
        makeHeading("Alum Dose Report"),
        new Paragraph({ text: `Alum Required per Hour (R): ${alumDose.R} g/hr` }),
        new Paragraph({ text: `Per Day (W): ${alumDose.W} kg/day` }),
        new Paragraph({ text: `For n months (Wt): ${alumDose.Wt} kg` }),
        new Paragraph({ text: `Tank Volume (V1): ${alumDose.V1} m³` }),
        new Paragraph({ text: `Provision Volume (V2): ${alumDose.V2} m³` }),
        new Paragraph({ text: `Total Volume (V): ${alumDose.V} m³` }),
        new Paragraph({ text: `Tank Diameter: ${alumDose.dia} m` }),
        new Paragraph({ text: `Square Platform Side (l): ${alumDose.l} m` }),
      ];
    }

    // 🔄 FLOCCULATOR DESIGN
    let fds = [];
    if (flocculatorDesign && flocculatorDesign.Q) {
      fds = [
        makeHeading("Flocculator Design Report"),
        new Paragraph({ text: `Outflow (Q): ${flocculatorDesign.Q} m³/hr` }),
        new Paragraph({ text: `Flocculator Volume (V): ${flocculatorDesign.V} m³` }),
        new Paragraph({ text: `Plan Area (A): ${flocculatorDesign.A} m²` }),
        new Paragraph({ text: `Diameter (D): ${flocculatorDesign.D} m` }),
        new Paragraph({ text: "Clarifier", heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: `Clarifier Surface Area (Ac): ${flocculatorDesign.Ac} m²` }),
        new Paragraph({ text: `Clariflocculator Diameter (D’): ${flocculatorDesign.Dp} m` }),
        new Paragraph({ text: `Weir Length (L): ${flocculatorDesign.L} m` }),
        new Paragraph({ text: `Weir Loading (F): ${flocculatorDesign.F} m³/m·day` }),
        new Paragraph({ text: `Tank Depth (d): ${flocculatorDesign.d} m` }),
        new Paragraph({ text: `Sludge Depth (d1): ${flocculatorDesign.d1} m` }),
        new Paragraph({ text: `Total Depth (d’): ${flocculatorDesign.dtotal} m` }),
        new Paragraph({ text: "Paddles", heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: `Paddle Area (Ap): ${flocculatorDesign.Ap_calc} m²` }),
        new Paragraph({ text: `Paddle Area (a): ${flocculatorDesign.a} m²` }),
        new Paragraph({ text: `Shaft Distance (s): ${flocculatorDesign.s} m` }),
        new Paragraph({ text: `Total Paddles (Tno): ${flocculatorDesign.Tno}` }),
        new Paragraph({ text: "Launder", heading: HeadingLevel.HEADING_3 }),
        new Paragraph({ text: `Flow (q): ${flocculatorDesign.q} m³/hr` }),
        new Paragraph({ text: `Launder Area (a’): ${flocculatorDesign.aL} m²` }),
        new Paragraph({ text: `Perimeter (P): ${flocculatorDesign.Pperimeter} m` }),
        new Paragraph({ text: `Mean Radius (R): ${flocculatorDesign.Rm}` }),
        new Paragraph({ text: `Slope (S): ${flocculatorDesign.S}` }),
      ];
    }

    // 🧱 GRAVITY FILTER
    let gf = [];
    if (gravityFilter && gravityFilter.Q1) {
      gf = [
        makeHeading("Gravity Filter Report"),
        new Paragraph({ text: `Design Flow (Q1): ${gravityFilter.Q1} m³/day` }),
        new Paragraph({ text: `Filter Area (A): ${gravityFilter.A} m²` }),
        new Paragraph({ text: `No. of Filters: ${gravityFilter.no}` }),
        new Paragraph({ text: `Area Each (A’): ${gravityFilter.A1} m²` }),
        new Paragraph({ text: `Total Perforation Area: ${gravityFilter.a} m²` }),
        new Paragraph({ text: `Total No. of Perforations: ${gravityFilter.num}` }),
        new Paragraph({ text: `Manifold Diameter (Qm): ${gravityFilter.Qm} m` }),
        new Paragraph({ text: `Laterals on Both Sides (Nbl): ${gravityFilter.Nbl}` }),
        new Paragraph({ text: `Total Tanks (No_Tank): ${gravityFilter.No_Tank}` }),
      ];
    }

    // 🧂 CHLORINATOR
    let chl = [];
    if (chlorinator && chlorinator.totalChlorineApplied) {
      chl = [
        makeHeading("Chlorinator Report"),
        new Paragraph({ text: `Total Chlorine Applied: ${chlorinator.totalChlorineApplied} mg/h` }),
        new Paragraph({ text: `Chlorine per Hour (R): ${chlorinator.R} mg/day` }),
        new Paragraph({ text: `Chlorine per Day (W): ${chlorinator.W} mg` }),
        new Paragraph({ text: `Total Chlorine Required (Wt): ${chlorinator.Wt} m³` }),
        new Paragraph({ text: `Tank Volume (V1): ${chlorinator.V1} m³` }),
        new Paragraph({ text: `Mixing Volume (V2): ${chlorinator.V2} m³` }),
        new Paragraph({ text: `Total Volume (V): ${chlorinator.totalVolume} m³` }),
        new Paragraph({ text: `Tank Diameter: ${chlorinator.Dia} m` }),
        new Paragraph({ text: `Square Platform (l): ${chlorinator.l} m` }),
      ];
    }

    // 🏗️ CLEAR WATER TANK (final revised)
    let cwtSection = [];
    if (clearWaterTank && clearWaterTank.A) {
      cwtSection = [
        makeHeading("Clear Water Tank Report"),
        new Paragraph({ text: `Cross Sectional Area (A): ${clearWaterTank.A} m²` }),
        new Paragraph({ text: `Diameter (d): ${clearWaterTank.diameter} m` }),
      ];
    }

    // ✅ Combine Everything
    const doc = new Document({
      sections: [
        {
          children: [
            ...wdSection,
            ...iwSection,
            ...pdSection,
            ...psSection,
            ...auSection,
            ...rmSection,
            ...ads,
            ...fds,
            ...gf,
            ...chl,
            ...cwtSection,
          ],
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    res.setHeader("Content-Disposition", "attachment; filename=ProjectReport.docx");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    );
    res.send(buffer);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Error generating report");
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
