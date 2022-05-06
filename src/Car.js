import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";

export function Car() {

    //importing car model
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/future_is_our_legacy/scene.gltf"
    );

    //scaling and positioning
    useEffect(() => {
        gltf.scene.scale.set(1,1,1);
        gltf.scene.position.set(0,-0.005,1);
        gltf.scene.traverse((object) => {
            if(object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 30;
            }
        });
    }, [gltf]);

    return <primitive object={gltf.scene} />
}