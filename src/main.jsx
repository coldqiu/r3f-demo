import React from "react";
import ReactDOM from "react-dom/client";
import {Loader} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import * as THREE from "three";
// import App from './App.jsx'
// import App from "./App4.jsx";
// import App from "./ReflectiveWall.jsx";
import App from "./43.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <Canvas orthographic camera={{zoom: 100, fov: 45, near: 0.1, far: 200, position: [3, 2, 6]}}> */}
    <Canvas
      // dpr={[1, 2]} // 默认值
      gl={{
        antialias: true,
        // toneMapping: THREE.CinonToneMapping,
        toneMapping: THREE.ACESFilmicToneMapping,
        // 上面两个设置没什么效果
        // 'LinearEncoding' is deprecated // 不赞同使用 LinearEncoding
        outputEncoding: THREE.LinearEncoding,
        outputEncoding: THREE.SRGBToLinear, // 默认配置
      }}
      // flat
      camera={{fov: 45, near: 0.1, far: 200, position: [3, 2, 6]}}
    >
      <App />
    </Canvas>
    <Loader />
  </React.StrictMode>
);
