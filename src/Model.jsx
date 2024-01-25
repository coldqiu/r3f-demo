import {Suspense} from "react";
import {useLoader} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {Physics, RigidBody} from "@react-three/rapier";
import * as THREE from "three";

function Model() {
  const result = useLoader(GLTFLoader, "/model/farm_online.glb");
  console.log("result: ", result);

  // MeshPhongMaterial

  // 修改模型材质
  var transparentMaterial = null;
  result.scene.traverse((child) => {
    // console.log("child: ", child);

    // metalness :
    if (child.isObject3D && child.material) {
      //
      child.material.metalness = 0.3;
      child.material.roughness = 0.5;
    }
    switch (child.name) {
      case "door":
        child.children.forEach((item) => {
          const materialClone = item.material.clone();
          // materialClone.opacity = 0.1;
          // // item.material.transmission = 0.5
          // materialClone.transparent = true;
          // item.material = materialClone;
          // transparentMaterial = materialClone;

          const phongMaterial = new THREE.MeshPhongMaterial({
            color: materialClone.color,
            map: materialClone.map, // 继承原始贴图
            // 其他属性可以根据需要进行设置
          });
          phongMaterial.opacity = 0.1;
          phongMaterial.transparent = true;
          item.material = phongMaterial;
        });
        break;
      case "fan":
        // 创建一个新的材质，设置为半透明
        var transparentMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0.5, // 设置透明度为50%
        });
        child.children.forEach((item) => {
          console.log("fan", item, item.name);
          // item.material = transparentMaterial // 没有生效
          if (item.name === "网格042") {
            const materialClone = item.material.clone();
            materialClone.opacity = 0.01;
            // item.material.transmission = 0.5
            materialClone.transparent = true;
            materialClone.deptWrite = false;
            materialClone.forceSinglePass = true;
            // materialClone.colorWrite = false
            // materialClone.color =
            // item.material = transparentMaterial
            item.material = materialClone;
            console.log("transparentMaterial: ", transparentMaterial);
          }
        });
        break;
    }
  });

  // You don't need to check for the presence of the result, when we're here
  // the result is guaranteed to be present since useLoader suspends the component
  return <primitive object={result.scene} />;
}

export default function App() {
  return (
    <Suspense fallback={<FallbackComponent /> /* or null */}>
      <RigidBody type="fixed" colliders="trimesh">
        <Model />
      </RigidBody>
    </Suspense>
  );
}

function FallbackComponent() {
  //   return <h1> loading</h1>;
  return "loading";
}
