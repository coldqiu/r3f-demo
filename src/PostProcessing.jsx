import React from "react";
import {Bloom, DepthOfField, EffectComposer, Noise, Vignette} from "@react-three/postprocessing";
import {BlurPass, Resizer, KernelSize, Resolution} from "postprocessing";
import {BokehPass} from "three/addons/postprocessing/BokehPass.js";

// import {Canvas} from "@react-three/fiber";

// export default function App() {
//   return (
//     <Canvas>
//       {/* Your regular scene contents go here, like always ... */}
//       <EffectComposer>
//         <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
//         <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
//         <Noise opacity={0.02} />
//         <Vignette eskil={false} offset={0.1} darkness={1.1} />
//       </EffectComposer>
//     </Canvas>
//   );
// }

export function PostProcessing() {
  //   const bokehPass = new BokehPass(scene, camera, {
  //     focus: 1.0,
  //     aperture: 0.025,
  //     maxblur: 0.01,
  //   });

  return (
    <EffectComposer>
      {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
      {/* <Bloom /> */}
      {/* luminanceThreshold={0} luminanceSmoothing={0.9} height={300} */}
      {/* <Noise opacity={0.02} /> */}
      {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
      <Bloom
        intensity={0.5} // The bloom intensity.
        // blurPass={undefined} // A blur pass.
        kernelSize={KernelSize.LARGE} // blur kernel size
        // luminanceThreshold={1} // luminance threshold. Raise this value to mask out darker elements in the scene.
        // luminanceSmoothing={0.1} // smoothness of the luminance threshold. Range is [0, 1]
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={false} // Enables or disables mipmap blur.
        resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      />

      {/* <Bloom
      //   blurPass={bokehPass}
      /> */}
    </EffectComposer>
  );
}
