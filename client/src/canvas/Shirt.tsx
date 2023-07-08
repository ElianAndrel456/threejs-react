// @ts-nocheck
import React from 'react'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'

export const Shirt = () => {
	const snap = useSnapshot(state)
	const shirt = useGLTF('/shirt_baked.glb')

	const logoTexture = useTexture(snap.logoDecal)
	const fullTexture = useTexture(snap.fullDecal)
	/* those are name in blender his mesh and geometry */

	/* Set Color Mesh */
	useFrame((state, delta) => easing.dampC(shirt.materials.lambert1.color, snap.color, 0.25, delta))

	const stateString = JSON.stringify(snap)

	return (
		<group key={stateString}>
			<mesh
				castShadow
				geometry={shirt.nodes.T_Shirt_male.geometry}
				material={shirt.materials.lambert1}
				material-roughness={1}
				dispose={null}>
				{snap.isFullTexture && (
					<Decal
						position={[0, 0, 0]}
						rotation={[0, 0, 0]}
						scale={1}
						map={fullTexture}
					/>
				)}
				{snap.isLogoTexture && (
					<Decal
						position={[0, 0.04, 0.15]}
						rotation={[0, 0, 0]}
						scale={0.15}
						map={logoTexture}
						depthTest={false}
					/>
				)}
			</mesh>
		</group>
	)
}
