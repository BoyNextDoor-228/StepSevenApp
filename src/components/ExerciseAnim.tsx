import React from "react";
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars, useFBX } from "@react-three/drei"
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import AirSquat from './AirSquat'
import Test from './Test'



const Box = () => {
    return (
        <mesh>
            <boxBufferGeometry attach="geometry"/>
            <meshLambertMaterial attach="material" color="#00FF00"/>
        </mesh>
    )
}

const Plane = () => {
    return (
        <mesh position={[0,-0.5,0]} rotation={[- Math.PI / 2, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[300, 300]}/>
            <meshLambertMaterial attach="material" color="#aaaaaa"/>
        </mesh>
    )
}

const ExerciseAnim = () => {

    //const fbx = useFBX(require('../components/AirSquat.fbx')) <primitive object={fbx} scale={0.125}/>


    return (<div className="" style={{height: "100vh", padding: "65px"}}>
        <h1>1. Exercise Name</h1>
        <span className="fw-bold fs-5">Курс от trainer.name</span>
        <div className="bg-dark w-75 h-75 mt-2">
            <Canvas camera={{ fov: 75, position: [25, 150, 100] }}>
                <OrbitControls addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} />
                <ambientLight intensity={0.5}/>
                <spotLight position={[10,15,10]} angle={0.04}/>
                    <Stars />
                    <Test scale={10} />
                    <Plane/>
                
            </Canvas>
        </div>
    </div>)
}

export default ExerciseAnim; 