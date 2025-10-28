import React, { useState } from 'react';
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
    const [active, setActive] = useState("Water Demand");

    return (
        <div className='change'>
            <Link to="/">
                <button className="glow-btn">Water Demand</button>
            </Link>

            <Link to="/intake-well">
                <button className="glow-btn">Intake Well</button>
            </Link>

            <Link to="/pump-design">
                <button className="glow-btn">Pump Design</button>
            </Link>

            <Link to="/Presedimentation-tank">
                <button className="glow-btn">Presedimentation Tank</button>
            </Link>

            <Link to="/Aeration-Unit">
                <button className="glow-btn">Aeration Unit</button>
            </Link>

            <Link to="/rapid-mix">
                <button className="glow-btn">Rapid Mix</button>
            </Link>

            <Link to="/alum-dose">
                <button className="glow-btn">Alum Dose</button>
            </Link>

            <Link to="/flocculator-design">
                <button className="glow-btn">Flocculator Design</button>
            </Link>

            <Link to="/Gravity-Filter">
                <button className="glow-btn">Gravity Filter</button>
            </Link>
            
            <Link to="/Chlorinator">
                <button className="glow-btn">Chlorinator</button>
            </Link>
            
            <Link to="/ClearWaterTank">
                <button className="glow-btn">Clear Water Tank</button>
            </Link>
        </div>
    );
}

export default Nav;
