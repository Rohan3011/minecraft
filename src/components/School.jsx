import React, { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationMixer, Mesh } from "three";

export function School() {
  const gltf = useLoader(GLTFLoader, "/models/school.glb");
  const mixer = useRef();

  useEffect(() => {
    // Adjust the initial scale and position of the loaded model
    gltf.scene.scale.set(1, 1, 1);
    gltf.scene.position.set(0, 0, 0);

    // Traverse the model to set shadow properties and envMapIntensity
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 0.5;
      }
    });

    // Initialize the AnimationMixer
    mixer.current = new AnimationMixer(gltf.scene);

    // Play animations if available
    const animations = gltf.animations;
    if (animations && animations.length > 0) {
      animations.forEach((animation) => {
        const action = mixer.current.clipAction(animation);
        action.play();
      });
    }
  }, [gltf]);

  useFrame((state, delta) => {
    // Update the AnimationMixer on each frame
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={gltf.scene} />;
}
