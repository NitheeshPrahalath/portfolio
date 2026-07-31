import { ImageResponse } from 'next/og';

export const alt = 'Nitheesh Prahalath | Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0b0f19 0%, #131929 100%)',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, color: '#ffffff' }}>
          Nitheesh Prahalath
        </div>
        <div style={{ fontSize: 32, color: '#7b8fff', marginTop: 20 }}>
          Developer · Learning in public
        </div>
      </div>
    ),
    { ...size }
  );
}
