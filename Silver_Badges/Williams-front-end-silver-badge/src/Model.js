import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { ContactShadows, useContextBridge } from "@react-three/drei";
import {
  A11y,
  useA11y,
  A11yAnnouncer,
  useUserPreferences,
  A11ySection,
  A11yUserPreferencesContext,
} from "@react-three/a11y";
import { ResizeObserver } from "@juggle/resize-observer";
import { proxy, useSnapshot } from "valtio";

const state = proxy({
  dark: false,
  motionDisabled: false,
  active: 0,
  rotation: 0,
});
const geometries = [
  new THREE.SphereBufferGeometry(1, 32, 32),
  new THREE.TetrahedronBufferGeometry(1.5),
  new THREE.TorusBufferGeometry(1, 0.35, 16, 32),
  new THREE.OctahedronGeometry(1.5),
  new THREE.IcosahedronBufferGeometry(1.5),
];

function ToggleButton(props) {
  const a11y = useA11y();
  return (
    <mesh {...props}>
      {/* <torusGeometry args={[0.5, a11y.pressed ? 0.28 : 0.25, 16, 32]} /> */}
      <meshStandardMaterial
        metalness={1}
        roughness={0.8}
        color={"#ffffff"}
        emissive={a11y.focus ? "#cc4444" : a11y.hover ? "#44bb44" : "#0088ee"}
      />
    </mesh>
  );
}

function Nav({ left }) {
  const snap = useSnapshot(state);
  const viewport = useThree((state) => state.viewport);
  const radius = Math.min(12, viewport.width / 2.5);
  return (
    <A11y
      role="button"
      description={`Spin ${left ? "left" : "right"}`}
      actionCall={() => {
        state.rotation = snap.rotation + ((Math.PI * 2) / 5) * (left ? -1 : 1);
        state.active = left
          ? snap.active === 0
            ? 4
            : snap.active - 1
          : snap.active === 4
          ? 0
          : snap.active + 1;
      }}
    >
      <Diamond
        position={[left ? -radius : radius, 0, 0]}
        rotation={[0, 0, -Math.PI / 4]}
        scale={[1, 1, 1]}
      >
        <meshBasicMaterial color="aqua" />
      </Diamond>
    </A11y>
  );
}

function Diamond({ position, rotation }) {
  const a11y = useA11y();
  return (
    <mesh position={position} rotation={rotation}>
      <tetrahedronBufferGeometry />
      <meshStandardMaterial
        metalness={1}
        roughness={0.8}
        color={a11y.focus || a11y.hover ? "#cc66dd" : "#ffffff"}
        emissive={a11y.focus ? "#cc4444" : a11y.hover ? "#339922" : "#003399"}
      />
    </mesh>
  );
}

function Shape({ index, active, ...props }) {
  const vec = new THREE.Vector3();
  const ref = useRef();
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    const s = active ? 2 : 1;
    ref.current.scale.lerp(vec.set(s, s, s), snap.motionDisabled ? 1 : 0.1);
    if (snap.motionDisabled) {
      ref.current.rotation.y = ref.current.rotation.x = active ? 1.5 : 4;
      ref.current.position.y = 0;
    } else {
      ref.current.rotation.y = ref.current.rotation.x +=
        delta / (active ? 1.5 : 4);
      ref.current.position.y = active
        ? Math.sin(state.clock.elapsedTime) / 2
        : 0;
    }
  });
  const { a11yPrefersState } = useUserPreferences();
  return (
    <mesh
      rotation-y={index * 2000}
      ref={ref}
      {...props}
      geometry={geometries[index]}
    >
      <meshStandardMaterial
        metalness={1}
        roughness={0.8}
        emissive={a11yPrefersState.prefersDarkScheme ? "#001166" : "#009999"}
        color="white"
      />
    </mesh>
  );
}

function Carroussel() {
  const viewport = useThree((state) => state.viewport);
  const snap = useSnapshot(state);
  const group = useRef();
  const radius = Math.min(6, viewport.width / 5);
  useFrame(
    () =>
      (group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        snap.rotation - Math.PI / 2,
        snap.motionDisabled ? 1 : 0.1
      ))
  );
  return (
    <group ref={group}>
      {["sphere", "pyramid", "donut", "octahedron", "icosahedron"].map(
        (name, i) => (
          <A11y
            key={name}
            role="content"
            description={`a ${name}`}
            tabIndex={-1}
            hidden={snap.active !== i}
          >
            <Shape
              index={i}
              position={[
                radius * Math.cos(i * ((Math.PI * 2) / 5)),
                0,
                radius * Math.sin(i * ((Math.PI * 2) / 5)),
              ]}
              active={snap.active === i}
              color={name}
            />
          </A11y>
        )
      )}
    </group>
  );
}

export default function Model() {
  const snap = useSnapshot(state);
  const { a11yPrefersState } = useUserPreferences();

  useEffect(() => {
    state.dark = a11yPrefersState.prefersDarkScheme;
    return () => {};
  }, [a11yPrefersState.prefersDarkScheme]);
  useEffect(() => {
    state.motionDisabled = a11yPrefersState.prefersReducedMotion;
    return () => {};
  }, [a11yPrefersState.prefersReducedMotion]);

  const ContextBridge = useContextBridge(A11yUserPreferencesContext);

  return (
    <>
      <Canvas
        resize={{ polyfill: ResizeObserver }}
        camera={{ position: [0, 0, 25], near: 4, far: 35 }}
        pixelRatio={[1, 1.5]}
      >
        <ContextBridge>
          <pointLight position={[100, 100, 100]} intensity={0.5} />
          <pointLight
            position={[-100, -100, -100]}
            intensity={1.5}
            color={snap.dark ? "#ccffcc" : "#00ffff"}
          />
          <ambientLight intensity={0.8} />
          <group
            //
            position-y={2}
            // rotation-z={Math.PI / 10}
            rotation-x={Math.PI / 20}
          >
            <A11ySection
              label="Shape carousel"
              description="This carousel contains 5 shapes. Use the Previous and Next buttons to cycle through all the shapes."
            >
              <Nav left />
              <Carroussel />
              <ContactShadows
                rotation-x={Math.PI / 2}
                position={[0, -5, 0]}
                opacity={0.4}
                width={30}
                height={30}
                blur={1}
                far={15}
              />
              <Nav />
              <A11y
                role="togglebutton"
                description="Light intensity"
                actionCall={() => (state.dark = !snap.dark)}
                activationMsg="Lower light disabled"
                deactivationMsg="Lower light enabled"
                a11yElStyle={{ marginLeft: "-40px" }}
              >
                <ToggleButton position={[0, -3, 9]} />
              </A11y>
            </A11ySection>
          </group>
        </ContextBridge>
      </Canvas>

      <A11yAnnouncer />
    </>
  );
}
