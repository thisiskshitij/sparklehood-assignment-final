import React, { useState } from 'react';
import { Incident } from '../types';
import '../styles/IncidentList.css';

interface Props {
  incidents: Incident[];
}

const IncidentList: React.FC<Props> = ({ incidents }) => {
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('Newest');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = incidents.filter(i =>
    filter === 'All' ? true : i.severity === filter
  );

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === 'Newest'
      ? new Date(b.reported_at).getTime() - new Date(a.reported_at).getTime()
      : new Date(a.reported_at).getTime() - new Date(b.reported_at).getTime()
  );

  return (
    <div className="incident-list">
      <div className="controls">
        <label>
          Filter by Severity:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label>
          Sort by Date:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Severity</th>
            <th>Reported Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(i => (
            <React.Fragment key={i.id}>
              <tr>
                <td>{i.title}</td>
                <td><span className={`badge ${i.severity.toLowerCase()}`}>{i.severity}</span></td>
                <td>{i.reported_at.split('T')[0]}</td>
                <td>
                  <button onClick={() => setExpanded(expanded === i.id ? null : i.id)}>
                    {expanded === i.id ? "Hide Details" : "View Details"}
                  </button>
                </td>
              </tr>
              {expanded === i.id && (
                <tr className="description-row">
                  <td colSpan={4}>{i.description}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncidentList;
