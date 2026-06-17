import React, { useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';

const ReactWebChat = dynamic(() => import('botframework-webchat'), {
  ssr: false,
  loading: () => <div className="loading">Initializing Sovereign Intelligence...</div>
});

export default function Home() {
  const directLine = useMemo(() => {
    if (typeof window !== 'undefined') {
      const { createDirectLine } = require('botframework-webchat');
      return createDirectLine({
        secret: process.env.NEXT_PUBLIC_DIRECT_LINE_SECRET
      });
    }
    return null;
  }, []);

  const styleOptions = {
    accent: '#22c55e',
    backgroundColor: '#030303',
    cardEmphasisBackgroundColor: '#0a0a0a',
    bubbleBackground: '#0a0a0a',
    bubbleTextColor: '#fafafa',
    bubbleFromUserBackground: '#22c55e',
    bubbleFromUserTextColor: '#000000',
    botAvatarImage: 'https://github.com/Khawrzm.png',
    hideUploadButton: true,
    sendBoxBackground: '#0a0a0a',
    sendBoxTextColor: '#fafafa',
    sendBoxBorderTop: '1px solid #1a1a1a',
  };

  return (
    <div className="container">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background-color: #030303;
          color: #fafafa;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
        }
        header {
          padding: 20px;
          border-bottom: 1px solid #1a1a1a;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .logo {
          width: 40px;
          height: 40px;
          background: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          border-radius: 4px;
        }
        .title {
          font-weight: 800;
          letter-spacing: -0.05em;
        }
        .subtitle {
          font-size: 10px;
          color: #22c55e;
          text-transform: uppercase;
          letter-spacing: 0.2em;
        }
        main {
          flex: 1;
          overflow: hidden;
          position: relative;
        }
        .webchat-container {
          height: 100%;
          width: 100%;
        }
        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #22c55e;
          font-family: monospace;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 1; }
          100% { opacity: 0.4; }
        }
      `}</style>
      
      <header>
        <div className="logo">K</div>
        <div>
          <div className="title">SOVEREIGN AGENT</div>
          <div className="subtitle">Claude Opus // Direct Line Orbit</div>
        </div>
      </header>

      <main>
        <div className="webchat-container">
          {directLine && (
            <ReactWebChat 
              directLine={directLine} 
              styleOptions={styleOptions}
              userID="Sovereign_User"
            />
          )}
        </div>
      </main>

      <footer>
        <div style={{ padding: '10px', fontSize: '10px', color: '#333', textAlign: 'center' }}>
          OP_ROOT_HASH: CONNECTED_TO_DIRECT_LINE
        </div>
      </footer>
    </div>
  );
}
