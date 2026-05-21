export default function Container({ children }) {
  return (
    <div style={{
      maxWidth: '760px',
      margin: '0 auto',
      padding: '0 24px',
    }}>
      {children}
    </div>
  );
}