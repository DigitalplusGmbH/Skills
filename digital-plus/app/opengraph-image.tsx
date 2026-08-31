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
          background: '#f6f8fb',
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
            color: '#121212',
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
            color: '#121212',
            maxWidth: '920px',
          }}
        >
          <span style={{ display: 'flex', marginRight: '20px' }}>Leads.</span>
          <span style={{ display: 'flex', color: '#7c3aed', marginRight: '20px' }}>Creative.</span>
          <span style={{ display: 'flex', color: '#00c4fb', marginRight: '20px' }}>IT &amp;</span>
          <span style={{ display: 'flex', color: '#00c4fb' }}>Sicherheit.</span>
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
            background: 'linear-gradient(135deg, #00c4fb 0%, #2563eb 34%, #7c3aed 62%, #d014f7 100%)',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
