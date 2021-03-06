/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(require('./semibridge.gltf'))
  const { actions } = useAnimations(animations, group)
  useEffect( () => { console.log(actions); actions.Movement.play() } )
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.LP_Девушка006.geometry}
          material={nodes.LP_Девушка006.material}
          skeleton={nodes.LP_Девушка006.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка007.geometry}
          material={nodes.LP_Девушка007.material}
          skeleton={nodes.LP_Девушка007.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка008.geometry}
          material={materials['Цвет тела.008']}
          skeleton={nodes.LP_Девушка008.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Глаза002.geometry}
          material={materials['Глаз.008']}
          skeleton={nodes.Глаза002.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ресницы002.geometry}
          material={materials['Материал.008']}
          skeleton={nodes.Ресницы002.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(require('./semibridge.gltf'))
