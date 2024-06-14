import React from "react";
import "./HeroSection.css";

const HeroSection = ({ adminName }) => {
  return (
    <div className="hero-section">
      <h1 className="hero-title">Système de gestion des absences</h1>
      <h1 className="hero-title">AdminPanel</h1>
      <h2 className="hero-subtitle">Bonjour {adminName}</h2>
    </div>
  );
};

export default HeroSection;
