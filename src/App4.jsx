import React, {useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Physics, RigidBody} from "@react-three/rapier";
import {Gltf, Environment, Fisheye, KeyboardControls, Box} from "@react-three/drei";
import Controller from "ecctrl";
import Model from "./Model";
import Cube from "./Cube";
import {PostProcessing} from "./PostProcessing";
import XSpotLight from "./XSpotLight";

export default function App() {
  const keyboardMap = [
    {name: "forward", keys: ["ArrowUp", "KeyW"]},
    {name: "backward", keys: ["ArrowDown", "KeyS"]},
    {name: "leftward", keys: ["ArrowLeft", "KeyA"]},
    {name: "rightward", keys: ["ArrowRight", "KeyD"]},
    // {name: "jump", keys: ["Space"]},
    // {name: "run", keys: ["Shift"]},
  ];

  return (
    <Canvas
      shadows
      onPointerDown={(e) => {
        // console.log("e", e);
        // e.target.requestPointerLock();
        // 在个api 的文档在哪里？
      }}
      /**
       * 在文档react-three-fiber/api/canvas 里竟然没有 onPointerDown 事件，
       * e 事件类型是 SyntheticBaseEvent 是react.js的合成事件
       * 新版react.js 文档 PointerEvent https://react.dev/reference/react-dom/components/common#pointerevent-handler
       * 在文档react-three-fiber/api/canvas 没有列出元素通用的属性、事件，只列出了特有的！？
       */
    >
      {/* <Fisheye zoom={0.4}> */}
      {/* <Environment files="/hdr/wrestling_gym_1k.hdr" ground={{scale: 10}} /> */}
      <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
        {/* args={[50, 1, 1, 2000]} */}
        {/* args={[-20, 20, 20, -20]} */}
        <perspectiveCamera attach="shadow-camera" />
        {/* 相机必须放 光照节点内！？ */}
      </directionalLight>
      <ambientLight intensity={1.5}>{/* <perspectiveCamera attach="shadow-camera" /> */}</ambientLight>
      <Physics
        colliders={"hull"}
        gravity={[0, 0, 0]}
        // maxStabilizationIterations={10}
        // maxVelocityFrictionIterations={20}
        // maxVelocityIterations={10}
        // 不理解这些参数 不了解Physics 组件
        timeStep="vary"
      >
        <KeyboardControls map={keyboardMap}>
          <Controller
            // mode="PointToMove"
            capsuleHalfHeight={0.35}
            capsuleRadius={0.3}
            camCollision={true}
            characterInitDir={0.1}
            camCollisionOffset={0.01}
            maxVelLimit={5}
            position={[11, 0, 8]}
            camFollowMult={100}
            camMinDis={-0.1}
            // camMaxDis={0.1}
            // capsuleRadius={1}
          >
            <Cube />
          </Controller>
        </KeyboardControls>
        {/* <RigidBody type="fixed" colliders="trimesh">
          <Gltf castShadow receiveShadow src="/model/farm_online.glb" />
        </RigidBody> */}
        <Model />
      </Physics>
      {/* </Fisheye> */}
      {/* <Gltf castShadow receiveShadow src="/model/farm_online.glb" /> */}
      <PostProcessing />
      {/* <spotLightHelper>
        <spotLight args={"0xffffff"} position={[10.813, 3.06, 6.973]} intensity={1} />
      </spotLightHelper> */}
      {/* <spotLight args={["0xffffff"]} position={[10.813, 3.06, 6.973]} intensity={3} /> */}
      {/* target={[10.813, 1.06, 6.973]}  */}
      {/* spotLight 的target 是一个Object3D对象 */}
      <XSpotLight />
    </Canvas>
  );
}
