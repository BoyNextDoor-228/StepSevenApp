/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(require('./jazz1.glb'))
  const { actions } = useAnimations(animations, group)
  useEffect( () => { console.log(actions); actions.Movement.play() } )
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.LP_Девушка057.geometry}
          material={nodes.LP_Девушка057.material}
          skeleton={nodes.LP_Девушка057.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка058.geometry}
          material={nodes.LP_Девушка058.material}
          skeleton={nodes.LP_Девушка058.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка059.geometry}
          material={materials['Цвет тела.021']}
          skeleton={nodes.LP_Девушка059.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Глаза019.geometry}
          material={materials['Глаз.021']}
          skeleton={nodes.Глаза019.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ресницы019.geometry}
          material={materials['Материал.021']}
          skeleton={nodes.Ресницы019.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(require('./jazz1.glb'))
