export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '24px 0',
      marginTop: '48px',
      textAlign: 'center',
      fontSize: '14px',
      color: 'var(--text-muted)',
    }}>
      <p>Built by Nitheesh Prahalath · {new Date().getFullYear()}</p>
    </footer>
  );
}