import * as THREE from "three";
import {DoubleSide} from "three";
import {useMemo, useRef, useEffect} from "react";

export default () => {
  const geometryRef = useRef();

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  return (
    // <mesh>
    //   <boxGeometry />
    //   <meshBasicMaterial color="red" />
    // </mesh>
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        ></bufferAttribute>
      </bufferGeometry>
      {/* <meshBasicMaterial color="pink" side={DoubleSide} /> */}
      <meshStandardMaterial color="red" side={DoubleSide} />
    </mesh>
  );
};
