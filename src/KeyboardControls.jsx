import {KeyboardControls} from "@react-three/drei";
import {PerspectiveCamera, OrbitControls, PresentationControls, CameraControls} from "@react-three/drei";
import {useThree, useFrame} from "@react-three/fiber";
import React, {useMemo, useState, useRef, useEffect} from "react";

console.log("PerspectiveCamera: ", PerspectiveCamera);
// console.log("PerspectiveCameraScene: ", PerspectiveCameraScene);
// console.log("KeyboardControls: ", KeyboardControls);
// console.log("PerspectiveCamera: ", PerspectiveCamera);

export default () => {
  const Controls = {
    forward: "forward",
    back: "back",
    left: "left",
    right: "right",
    jump: "jump",
  };
  const map = useMemo(
    () => [
      {
        name: Controls.forward,
        keys: ["ArrowUp", "KeyW"],
      },
      {
        name: Controls.back,
        keys: ["ArrowDown", "KeyS"],
      },
      {
        name: Controls.left,
        keys: ["ArrowLeft", "KeyA"],
      },
      {
        name: Controls.right,
        keys: ["ArrowRight", "KeyD"],
      },
      {
        name: Controls.color,
        keys: ["Space"],
      },
    ],
    []
  );
  const [color, setColor] = useState("green");

  const cameraRef = useRef();

  useEffect(() => {
    console.log(" cameraRef", cameraRef);
  });
  const camera = useThree((state) => state.camera);
  console.log("camera: ", camera);
  const set = useThree((state) => state.set);

  useEffect(() => {
    set({camera: cameraRef.current});
  });
  // console.log("orbitControlsRef.current.target.set: ", orbitControlsRef.current.target.set);
  // console.log("cameraRef.current.position: ", cameraRef.current.position);

  // 控制器 OrbitControls
  const orbitControlsRef = useRef();

  //
  useEffect(() => {
    console.log(
      "useEffect: (orbitControlsRef.current.target.set",
      orbitControlsRef.current.target,
      cameraRef.current.position
    );
    if (orbitControlsRef.current.target) {
      orbitControlsRef.current.target.set(
        cameraRef.current.position.x,
        cameraRef.current.position.y,
        cameraRef.current.position.z
      );
      //  这么设置 镜头移动不对
    }
  });

  return (
    <>
      <KeyboardControls
        map={map}
        // onChange={(name, pressed, _state) => {
        //   if (name === Controls.color && pressed) {
        //     setColor((color) => (color === "green" ? "red" : "green"));
        //   }
        //   // 移动
        //   if (name === Controls.left) {
        //     cameraRef.current.position.x = cameraRef.current.position.x + 0.2;
        //   }
        //   if (name === Controls.right) {
        //     cameraRef.current.position.x = cameraRef.current.position.x - 0.2;
        //   }
        //   if (name === Controls.forward) {
        //     cameraRef.current.position.z = cameraRef.current.position.z + 0.2;
        //   }
        //   if (name === Controls.back) {
        //     cameraRef.current.position.z = cameraRef.current.position.z - 0.2;
        //   }
        //   console.log(
        //     "onChange: (orbitControlsRef.current.target.set",
        //     orbitControlsRef.current.target,
        //     cameraRef.current.position
        //   );
        //   // //  这么设置 镜头无法旋转
        //   if (orbitControlsRef.current.target) {
        //     orbitControlsRef.current.target.set(
        //       cameraRef.current.position.x + 3,
        //       cameraRef.current.position.y,
        //       cameraRef.current.position.z
        //     );
        //   }
        // }}
      ></KeyboardControls>
      <PerspectiveCamera ref={cameraRef} position={[14, 2, 11]} />
      <OrbitControls
        ref={orbitControlsRef}
        enableDamping
        enablePan
        enableRotate
        enableZoom
        // object={cameraRef} //
        // target={cameraRef.current}
        rotateSpeed={0.08}
        onChange={(e) => {
          console.log("onchange 相机旋转 OrbitControls", e);
        }}
      >
        {/* <PerspectiveCamera ref={cameraRef} position={[14, 2, 11]} /> */}
      </OrbitControls>
      {/* <CameraControls /> */}
      {/* <PresentationControls enabled global snap>
   
      </PresentationControls> */}
    </>
  );
};
