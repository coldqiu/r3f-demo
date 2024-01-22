// import {createRoot} from "react-dom/client";
import React, {useRef, useState} from "react";
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import Model from "./Model";
import FirstPersonControls from "./FirstPersonControls";
import KeyboardControls from "./KeyboardControls";
import CameraControls from "./CameraControls";

export default function AA() {
  return (
    <Canvas
      onCreated={(state) => {
        console.log("onCreated state", state);
      }}
    >
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

      <FirstPersonControls />
      {/* <KeyboardControls /> */}
      {/* <KeyboardControls><Model /></KeyboardControls> */}
      <Model />

      {/* <CameraControls /> */}
    </Canvas>
  );
}

// 获取组件实例 ref
// useFrame
// 在父组件的props配置子主键的props 数据向下传递

// rotataion position 在mesh 上
