export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #eee',
      padding: '24px 0',
      marginTop: '48px',
      textAlign: 'center',
      fontSize: '14px',
      color: '#888',
    }}>
      <p>Built by Nitheesh Prahalath · {new Date().getFullYear()}</p>
    </footer>
  );
}