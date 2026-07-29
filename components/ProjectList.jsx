'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Build filter list dynamically from all tech tags
  const allTechs = ['All', ...new Set(projects.flatMap((p) => p.tech))];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.tech.includes(activeFilter));

  return (
    <div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setActiveFilter(tech)}
            style={{
              padding: '6px 16px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: activeFilter === tech ? 'var(--accent)' : 'var(--bg-card)',
              color: activeFilter === tech ? '#fff' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: activeFilter === tech ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))
      ) : (
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>No projects found.</p>
      )}

    </div>
  );
}
