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
        <Canvas
          shadows
          camera={{
            position: [0, 0.8, 3],
            fov: 75,
          }}
        >
          <Experience client={client} />
        </Canvas>
      </KeyboardControls>
      {/* {
      client && */}
      <ChatBubble client={client} />
      {/* } */}
    </>
  );
}

export default App;