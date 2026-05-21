export default function ProjectCard({ project }) {
  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '16px',
    }}>
      <h3 style={{ marginBottom: '8px' }}>{project.title}</h3>
      <p style={{ color: '#555', marginBottom: '12px' }}>{project.description}</p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            background: '#f0f0f0',
            padding: '2px 10px',
            borderRadius: '999px',
            fontSize: '13px',
          }}>
            {t}
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
        {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub →</a>}
        {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer">Live →</a>}
      </div>
    </div>
  );
}