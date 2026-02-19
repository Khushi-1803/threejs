import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
//import Geometries from "three/src/renderers/common/Geometries.js";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("/textures/particles/5.png");

/**
 * Test cube
 */
// const particleGeometry = new THREE.SphereGeometry(1,32,32)
// const particleMaterial = new THREE.PointsMaterial({size:0.02})
// particleMaterial.sizeAttenuation = true;
// const particle = new THREE.Points(particleGeometry,particleMaterial)

const particleGeometry = new THREE.BufferGeometry();

const count = 5000;

const position = new Float32Array(count * 3);

const color = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  position[i] = (Math.random() - 0.5) * 10;
  color[i] = Math.random();
}
particleGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(position, 3),
);
particleGeometry.setAttribute("color", new THREE.BufferAttribute(color, 3));
const particleMaterial = new THREE.PointsMaterial({ size: 0.1 });
//particleMaterial.color = new THREE.Color("pink")
particleMaterial.vertexColors = true;
particleMaterial.map = texture;
particleMaterial.alphaMap = texture;
particleMaterial.transparent = true;
particleMaterial.depthTest = false;
particleMaterial.blending = THREE.AdditiveBlending;
const particle = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particle);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Mouse tracking
const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;
  camera.lookAt(particle.position);

  // Update controls
  controls.update();
  for (let i = 0; i < count; i++) {
    const i3 = i*3;
    
   const x = particleGeometry.attributes.position.array[i3]
    particleGeometry.attributes.position.array[i3+1] = Math.sin(elapsedTime+x)
  }
  particleGeometry.attributes.position.needsUpdate = true;
  //particle.position.y = Math.sin(elapsedTime)*0.2
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
