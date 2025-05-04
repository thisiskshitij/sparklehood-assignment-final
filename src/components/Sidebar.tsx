import React from 'react';
import '../styles/Sidebar.css';

interface Props {
  onNavigate: (view: 'home' | 'form') => void;
}

const Sidebar: React.FC<Props> = ({ onNavigate }) => (
  <div className="sidebar">
    <button onClick={() => onNavigate('home')}>Home</button>
    <button onClick={() => onNavigate('form')}>Report Incident</button>
  </div>
);

export default Sidebar;
