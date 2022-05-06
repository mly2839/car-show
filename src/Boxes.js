import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

function Box ({color}) {
    //consts
    const box = useRef();
    const time = useRef(0);
    const [xRot] = useState(() => Math.random());
    const [yRot] = useState(() => Math.random());
    const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
    const [position, setPosition] = useState(initPosition());

    //function that gives a random vector for the position
    function initPosition() {
        let v = new Vector3( (Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15);
        //logic to not let it get in the lane of the car
        if (v.x < 0) {
            v.x -= 1.75
        } 
        if (v.x > 0) {
            v.x += 1.75
        }

        return v;
    }

    //function that gives a random vector for the position to respawn boxes
    function resetPosition() {
        let v = new Vector3( (Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 10 + 10);
        //logic to not let it get in the lane of the car
        if (v.x < 0) {
            v.x -= 1.75
        } 
        if (v.x > 0) {
            v.x += 1.75
        }

        setPosition(v);
    }

    //changing position to move with scene
    useFrame((state, delta) => {
        time.current += delta * 1.2;
        let zn = position.z - time.current;

        if (zn < -10) {
            resetPosition();
            time.current = 0;
        }

        box.current.position.set(position.x, position.y, zn);
        box.current.rotation.x += delta * xRot;
        box.current.rotation.y += delta * yRot;
    }, [xRot, yRot, position]);

    return (
        <mesh ref={box} scale={scale} castShadow>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial color={color} envMapIntensity={0.15} />
        </mesh>
    );

}

//function that creates 100 boxes
export function Boxes() {
    const [tmp] = useState(() => {
        let x = [];
        for (let i = 0; i < 100; i++) {
            x.push(0);
        }
        return x;
    });

    return <>
        {tmp.map((e,i) => <Box key={i} color={i % 2 === 0 ? [0.4,0.1,0.1] : [0.05,0.15,0.4]} />)}
    </>
}