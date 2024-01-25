import {useThree, useFrame} from "@react-three/fiber";
import {SpotLight, SpotLightHelper} from "three";

export default () => {
  // const three = useThree();
  // const {gl} = three;

  // const spotLight = new SpotLight(0xffffff);
  // spotLight.position.set(10, 10, 10);
  // spotLight.castShadow = true;
  // spotLight.shadow.bias = 0.005;
  // spotLight.shadow.radius = 1;
  // spotLight.shadow.mapSize.width = 512;
  // spotLight.shadow.mapSize.height = 512;
  // spotLight.shadow.bias = 0.005;
  // spotLight.angle = Math.PI / 4;
  // spotLight.penumbra = 1;

  // const spotLightHelper = new SpotLightHelper(spotLight);
  // spotLightHelper.visible = false; // Hidden by default
  // spotLightHelper.position.copy(spotLight.position);
  // spotLightHelper.update(); // Must be manually called when spotLight properties change

  // useFrame(() => {
  //   spotLightHelper.update(); // Must be manually called on every frame to update the helper's geometry
  // });

  const lightsMap = [
    {position: [10.813, 3.06, 6.973], intensity: 3, args: ["red", 0.4, 10, Math.PI * 0.3], key: 0},
    {position: [12.207, 3.06, 5.6], intensity: 3, args: ["red", 0.4, 10, Math.PI * 0.3], key: 2},
  ];

  return (
    <>
      {/* <spotLight position={[10.813, 3.06, 6.973]} intensity={3} args={["red", 0.4, 10, Math.PI * 0.3]} /> */}
      {/* {spotLightHelper} */}
      {/* // Must be added to the scene graph to be rendered */}
      {lightsMap.map((item) => {
        let position = [item.position[0], item.position[1] - 2, item.position[2]];
        // let target = <mesh position={position} />;
        let target = <boxGeometry position={position} />;
        console.log("target: ", target);

        // console.log("boxGeometry: ", boxGeometry);
        // console.log("spotLight: ", spotLight);

        // 怎么给spotLight 加上target
        return (
          // target={target} // 这么赋值会报错
          <spotLight {...item}>
            {/* <spotLight {...item} target={<boxGeometry position={position} />}> */}
            {/* target={} */}
            {/* <mesh /> */}
          </spotLight>
        );
      })}
    </>
  );
};

// 上面的写法正确嘛，感觉非常奇怪
