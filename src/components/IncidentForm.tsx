import React, { useState } from "react";
import { Incident } from "../types";
import "../styles/IncidentForm.css";

interface Props {
  onSubmit: (incident: Incident) => void;
}

const IncidentForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newIncident: Incident = {
      id: Date.now(),
      title,
      severity: severity as "Low" | "Medium" | "High",
      description,
      reported_at: new Date().toISOString(),
    };

    onSubmit(newIncident);
    setTitle("");
    setSeverity("Low");
    setDescription("");
  };

  return (
    <form className="incident-form" onSubmit={handleSubmit}>
      <h2>Report New Incident</h2>
      <label>Title:</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Severity:</label>
      <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <label>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default IncidentForm;
