import React, { useState } from "react";
import { Field } from "./Field";

export default function ClearWaterTank() {
  const [form, setForm] = useState({
    projectTitle: "",
    depthoftank: "",
  });

  const [results, setResults] = useState(null);

  const setField = (name, value) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const calculateResults = () => {
    const D = parseFloat(form.depthoftank) || 3; // default min 3m
    const radius = D / 2;
    const A = Math.PI * radius * radius; // cross-sectional area
    const diameter = D; // assuming tank is circular with height = depth for simplicity

    setResults({
      A: A.toFixed(2),
      diameter: diameter.toFixed(2),
    });

    localStorage.setItem("clearWaterTankResults", JSON.stringify({
      A: A.toFixed(2),
      diameter: diameter.toFixed(2),
    }))
  };

  const handleDownloadReport = async () => {
    try {
      const data = {
        waterDemand: JSON.parse(localStorage.getItem("waterDemandResults") || "{}"),
        intakeWell: JSON.parse(localStorage.getItem("intakeWellResults") || "{}"),
        pumpDesign: JSON.parse(localStorage.getItem("pumpDesignResults") || "{}"),
        preSedimentation: JSON.parse(localStorage.getItem("preSedimentationResults") || "{}"),
        aerationUnit: JSON.parse(localStorage.getItem("aerationUnitResults") || "{}"),
        rapidMix: JSON.parse(localStorage.getItem("rapidMixResults") || "{}"),
        alumDose: JSON.parse(localStorage.getItem("alumDoseResults") || "{}"),
        flocculatorDesign: JSON.parse(localStorage.getItem("flocculatorDesignResults") || "{}"),
        gravityFilter: JSON.parse(localStorage.getItem("gravityFilterResults") || "{}"),
        chlorinator: JSON.parse(localStorage.getItem("chlorinatorResults") || "{}"),
        clearWaterTank: JSON.parse(localStorage.getItem("clearWaterTankResults") || "{}"),
      };

      const response = await fetch("http://localhost:5000/final-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FinalProjectReport.docx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      // clear all stored results after download
      localStorage.removeItem("waterDemandResults");
      localStorage.removeItem("intakeWellResults");
      localStorage.removeItem("pumpDesignResults");
      localStorage.removeItem("preSedimentationResults");
      localStorage.removeItem("aerationUnitResults");
      localStorage.removeItem("rapidMixResults");
      localStorage.removeItem("alumDoseResults");
      localStorage.removeItem("flocculatorDesignResults");
      localStorage.removeItem("gravityFilterResults");
      localStorage.removeItem("chlorinatorResults");
      localStorage.removeItem("clearWaterTankResults");
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="form-box">
        <div className="breadcrumb bold">Clear Water Tank</div>

        <form className="form-container">
          <Field
            label="Project Title"
            name="projectTitle"
            value={form.projectTitle}
            onChange={setField}
            help="Enter your project title."
          />

          <Field
            label="Depth of Tank (D)"
            name="depthoftank"
            value={form.depthoftank}
            onChange={setField}
            unit="m"
            help="Min 3m (may vary)"
            type="number"
          />

          {/* Buttons */}
          <div className="button-row">
            <button
              type="button"
              className="secondary-btn"
              onClick={calculateResults}
            >
              Calculate
            </button>
            <button
              type="button"
              className="glow-btn"
              onClick={handleDownloadReport}
            >
              Download Report
            </button>
          </div>

          {/* Results Section */}
          {results && (
            <div className="results-box">
              <h3>Results</h3>
              <p>C/S area of tank (A): {results.A} m²</p>
              <p>Diameter of tank (d): {results.diameter} m</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
