import {RigidBody} from "@react-three/rapier";

export default function Cube(props) {
  function onClick(e) {
    console.log("click cube event", e);
  }
  return (
    <RigidBody
      onWake={() => {
        console.log("onWake");
      }}
      {...props}
      type="fixed"
      colliders="cuboid"
    >
      <mesh receiveShadow castShadow onClick={onClick}>
        {[...Array(6)].map((_, index) => (
          <meshStandardMaterial attach={`material-${index}`} key={index} color={"hotpink"} />
          // map={texture}
        ))}
        <boxGeometry args={[0.2, 2, 0.2]} />
      </mesh>
    </RigidBody>
  );
}

// copy from:
// https://codesandbox.io/p/sandbox/minecraft-vkgi6?file=%2Fsrc%2FCube.js%3A23%2C38
// Cube.jsx

// position={[10, 1.8, 7]}
/** * 给 mesh 添加上 position 后 mesh的移动变得异常 */
