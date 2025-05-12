import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { KeyboardControls, Loader } from '@react-three/drei';
import { useConvaiClient } from './hooks/useConvaiClient';
import ChatBubble from './components/chat/Chat';

function App() {
  /**
   * Add apikey and character id here
   */
  const convaiApiKey = '40fb8118ec1dbc8b4b76a13208efdd0d';
  const characterId = 'ad24dcfc-2f15-11f0-b949-42010a7be01f';

  const { client } = useConvaiClient(characterId, convaiApiKey);

  // Prevent double-click from triggering pointer lock
  useEffect(() => {
    const handlePointerLock = (e) => {
      e.preventDefault();
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('dblclick', handlePointerLock);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('dblclick', handlePointerLock);
      }
    };
  }, []);

  return (
    <>
      <KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'w', 'W'] },
          { name: 'backward', keys: ['ArrowDown', 's', 'S'] },
          { name: 'left', keys: ['ArrowLeft', 'a', 'A'] },
          { name: 'right', keys: ['ArrowRight', 'd', 'D'] },
          { name: 'sprint', keys: ['Shift'] },
          { name: 'jump', keys: ['Space'] },
        ]}
      >
        <Loader />
        <div
          className="avatar-container"
          style={{
            width: '25vw',
            height: '60vh',
            border: '2px solid #ccc',
            margin: '20px auto',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <Canvas
            style={{
              width: '100%',
              height: '100%',
            }}
            shadows
            camera={{
              position: [0, 0.1, 1],
              fov: 25,
            }}
          >
            <Experience client={client} />
          </Canvas>
        </div>
      </KeyboardControls>

      <ChatBubble client={client} />
    </>
  );
}

export default App;
