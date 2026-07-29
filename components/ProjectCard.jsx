'use client';

import { useState } from 'react';

export default function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '10px',
        padding: '24px',
        marginBottom: '16px',
        background: 'var(--bg-card)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '0 8px 24px rgba(79,110,247,0.12)' : 'none',
        transition: 'all 0.2s ease',
      }}
    >
      <h3 style={{ marginBottom: '8px', color: 'var(--text-primary)' }}>{project.title}</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '14px', fontSize: '15px' }}>{project.description}</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            padding: '3px 10px',
            borderRadius: '999px',
            fontSize: '12px',
            fontWeight: '600',
          }}>
            {t}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: '500' }}>GitHub →</a>}
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: '500' }}>Live →</a>}
      </div>
    </div>
  );
}