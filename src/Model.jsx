import {Suspense} from "react";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

function Model() {
  const result = useLoader(GLTFLoader, "/model/farm_online.glb");
  // You don't need to check for the presence of the result, when we're here
  // the result is guaranteed to be present since useLoader suspends the component
  return <primitive object={result.scene} />;
}

export default function App() {
  return (
    <Suspense fallback={<FallbackComponent /> /* or null */}>
      <Model />
    </Suspense>
  );
}

function FallbackComponent() {
  //   return <h1> loading</h1>;
  return "loading";
}
