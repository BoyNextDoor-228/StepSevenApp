/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(require('./Test.gltf'))
  const { actions } = useAnimations(animations, group)

  useEffect( () => { console.log(actions); actions.Movement.play() } )

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.LP_Девушка001.geometry}
          material={materials['Цвет тела.001']}
          skeleton={nodes.LP_Девушка001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Брови001.geometry}
          material={nodes.Брови001.material}
          skeleton={nodes.Брови001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Волосы001.geometry}
          material={nodes.Волосы001.material}
          skeleton={nodes.Волосы001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Глаза002.geometry}
          material={materials['Глаз.001']}
          skeleton={nodes.Глаза002.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ресницы002.geometry}
          material={materials['Материал.001']}
          skeleton={nodes.Ресницы002.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(require('./Test.gltf'))