/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(require('./sitdownsbendarms.gltf'))
  const { actions } = useAnimations(animations, group)
  useEffect( () => { console.log(actions); actions.Movement.play() } )
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.LP_Девушка003.geometry}
          material={materials['Цвет тела.008']}
          skeleton={nodes.LP_Девушка003.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка004.geometry}
          material={nodes.LP_Девушка004.material}
          skeleton={nodes.LP_Девушка004.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка005.geometry}
          material={nodes.LP_Девушка005.material}
          skeleton={nodes.LP_Девушка005.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Глаза001.geometry}
          material={materials['Глаз.011']}
          skeleton={nodes.Глаза001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ресницы001.geometry}
          material={materials['Материал.012']}
          skeleton={nodes.Ресницы001.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(require('./sitdownsbendarms.gltf'))
