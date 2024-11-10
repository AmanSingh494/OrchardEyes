import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import model from '../assets/3dmodels/drone.gltf'

function DroneModel() {
  const group = useRef()
  const { scene } = useGLTF(model)

  // useEffect(() => {
  //     const foundPropellers = []
  //     scene.traverse((child) => {
  //         if (child.name.includes("propeller")) {
  //             // Store original position and parent
  //             const originalPosition = child.position.clone()
  //             const originalParent = child.parent
  //             const originalRotation = child.rotation.clone()
  //             const originalScale = child.scale.clone()

  //             // Create rotation wrapper that will stay at the propeller's position
  //             const wrapper = new THREE.Group()
  //             wrapper.position.copy(originalPosition)
  //             wrapper.rotation.copy(originalRotation)
  //             wrapper.scale.copy(originalScale)

  //             // Add the propeller to the wrapper
  //             wrapper.add(child)
  //             originalParent.add(wrapper)

  //             foundPropellers.push(wrapper)
  //         }
  //     })
  //     setPropellers(foundPropellers)
  // }, [scene])

  // Lift and rotate propellers
  useFrame((state, delta) => {
    // Use a sine wave to create a smooth up and down hover effect
    const time = state.clock.getElapsedTime()
    const hoverHeight = Math.sin(time * 2) * 0.2 // Adjust the frequency and amplitude as needed
    group.current.position.z = hoverHeight

    // propellers.forEach((propeller) => {
    //     propeller.rotation.z += delta * 20 // Rotate propellers around their Z-axis
    // })
  })

  return (
    <group ref={group} scale={[0.015, 0.015, 0.015]}>
      <primitive object={scene} />
    </group>
  )
}

export default function DroneComponent() {
  const [isLifted, setIsLifted] = useState(false)

  return (
    <div style={{ width: '60vw', height: '60vh' }}>
      <Canvas camera={{ position: [0, -7, 5] }} shadows>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />

        <DroneModel isLifted={isLifted} />
      </Canvas>
    </div>
  )
}
