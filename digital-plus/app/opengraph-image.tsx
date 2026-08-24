import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '90px',
          background: '#f8f9fb',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: 30,
            fontWeight: 700,
            color: '#0b0c10',
            marginBottom: '48px',
          }}
        >
          Digital Plus
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#0b0c10',
            maxWidth: '920px',
          }}
        >
          <span style={{ display: 'flex', marginRight: '20px' }}>Leads.</span>
          <span style={{ display: 'flex', color: '#0091d4', marginRight: '20px' }}>Creative.</span>
          <span style={{ display: 'flex', color: '#6d28d9', marginRight: '20px' }}>IT &amp;</span>
          <span style={{ display: 'flex', color: '#d6169f' }}>Sicherheit.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 28, color: '#52565f', marginTop: '36px', maxWidth: '820px' }}>
          Ein digitaler Partner für Wachstum, Marke und Infrastruktur.
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '10px',
            background: 'linear-gradient(120deg, #0091d4 0%, #6d28d9 50%, #d6169f 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
