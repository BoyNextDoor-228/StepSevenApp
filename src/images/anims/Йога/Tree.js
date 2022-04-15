/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(require('./tree.gltf'))
  const { actions } = useAnimations(animations, group)
  useEffect( () => { console.log(actions); actions.Movement.play() } )
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.LP_Девушка012.geometry}
          material={materials['Цвет тела.001']}
          skeleton={nodes.LP_Девушка012.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка013.geometry}
          material={nodes.LP_Девушка013.material}
          skeleton={nodes.LP_Девушка013.skeleton}
        />
        <skinnedMesh
          geometry={nodes.LP_Девушка014.geometry}
          material={nodes.LP_Девушка014.material}
          skeleton={nodes.LP_Девушка014.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Глаза004.geometry}
          material={materials['Глаз.001']}
          skeleton={nodes.Глаза004.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ресницы004.geometry}
          material={materials['Материал.001']}
          skeleton={nodes.Ресницы004.skeleton}
        />
      </group>
    </group>
  )
}

useGLTF.preload(require('./tree.gltf'))
