import { Physics } from "@react-three/cannon";
import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Ground } from "./components/Ground";
import { Player } from "./components/Player";
import { FFP } from "./components/FFP";
import { Suspense } from "react";
import { School } from "./components/School";

function App() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Suspense fallback={"loading..."}>
        <Canvas>
          <Sky sunPosition={[100, 100, 20]} />
          <ambientLight intensity={0.8} />
          <FFP />
          <Physics>
            <Player />
            <School />
            <Ground />
          </Physics>
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
