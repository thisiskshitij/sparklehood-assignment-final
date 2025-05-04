import React, { useState } from 'react';
import './styles/App.css';
import { Incident } from './types';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import IncidentList from './components/IncidentList';
import IncidentForm from './components/IncidentForm';

const initialIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics...",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information...",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata...",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

function App() {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [view, setView] = useState<'home' | 'form'>('home');

  const addIncident = (incident: Incident) => {
    setIncidents([incident, ...incidents]);
    setView('home');
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Sidebar onNavigate={setView} />
        <div className="content">
          {view === 'home' ? (
            <IncidentList incidents={incidents} />
          ) : (
            <IncidentForm onSubmit={addIncident} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
