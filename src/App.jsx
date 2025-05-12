import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { KeyboardControls, Loader } from '@react-three/drei';
import { useConvaiClient } from './hooks/useConvaiClient';
import ChatBubble from './components/chat/Chat';

function App() {
  /**
   * Add apikey and character id here
   */
    const convaiApiKey = 'b65a98cf5bcbb936885d633be5317c85';
    const characterId = '07c186d4-2b28-11f0-999a-42010a7be01d';

  const { client } = useConvaiClient(characterId, convaiApiKey);
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
        {/* <Leva /> */}
        <div className="avatar-container"
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
      {/* {
      client && */}
      <ChatBubble client={client} />
      {/* } */}
    </>
  );
}

export default App;