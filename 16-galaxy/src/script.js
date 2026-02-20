import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
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
 
 * Test cube
 */
const guiChange = {};
guiChange.count = 100000;
guiChange.size = 0.01;
guiChange.radius = 5;
guiChange.branch = 4;
guiChange.spin = 1;
guiChange.randomness = 0.2;
guiChange.insideColor = "#ff6030";
guiChange.outsideColor = "#1b3984";

let particleGeometry = null;
let particleMaterial = null;
let particle = null;

const galaxy = () => {
  if (particle !== null) {
    particleGeometry.dispose();
    particleMaterial.dispose();
    scene.remove(particle);
  }
  particleGeometry = new THREE.BufferGeometry();
  const position = new Float32Array(guiChange.count * 3);
  const color = new Float32Array(guiChange.count * 3);

  particleMaterial = new THREE.PointsMaterial({
    size: guiChange.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
     vertexColors: true 
  });

  particle = new THREE.Points(particleGeometry, particleMaterial);
  
  for (let i = 0; i < guiChange.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * guiChange.radius;

    const branchAngle =
      ((i % guiChange.branch) / guiChange.branch) * Math.PI * 2;

    const spinAngle = radius * guiChange.spin;

    const randomX =
      Math.pow(Math.random(), 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      guiChange.randomness *
      radius;

    const randomY =
      Math.pow(Math.random(), 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      guiChange.randomness *
      radius *
      0.3; // thinner galaxy vertically

    const randomZ =
      Math.pow(Math.random(), 3) *
      (Math.random() < 0.5 ? 1 : -1) *
      guiChange.randomness *
      radius;

    position[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    position[i3 + 1] = randomY;
    position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const ic = new THREE.Color(guiChange.insideColor)
    const oc = new THREE.Color(guiChange.outsideColor)
    
    const mixed = ic.clone();
    mixed.lerp(oc,radius/guiChange.radius)

    color [i3] = mixed.r
    color [i3+1] = mixed.g
    color [i3+2] = mixed.b
  }
  particleGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(position, 3),
  );
  particleGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(color, 3),
  );
  scene.add(particle);
};
gui
  .add(guiChange, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(galaxy);
gui
  .add(guiChange, "size")
  .min(0.00001)
  .max(1)
  .step(0.001)
  .onFinishChange(galaxy);
gui.add(guiChange, "radius").min(0.1).max(20).step(0.1).onFinishChange(galaxy);
gui.add(guiChange, "branch").min(2).max(12).step(1).onFinishChange(galaxy);
gui.add(guiChange, "spin").min(-5).max(5).step(0.001).onFinishChange(galaxy);
gui
  .add(guiChange, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(galaxy);
gui.add(guiChange, "insideColor").onFinishChange(galaxy);
gui.add(guiChange, "outsideColor").onFinishChange(galaxy);

galaxy();
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// Mouse tracking
const cursor = { x: 0, y: 0 };

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

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
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
scene.add(camera);


//star 
// ⭐ Star Field
const starGeometry = new THREE.BufferGeometry();
const starCount = 2000;

const starPositions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {
  const i3 = i * 3;

  // Spread stars randomly in space
  starPositions[i3]     = (Math.random() - 0.5) * 100;
  starPositions[i3 + 1] = (Math.random() - 0.5) * 100;
  starPositions[i3 + 2] = (Math.random() - 0.5) * 100;
}

starGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  color: 0xffffff,
  transparent: true,
  depthWrite: false
});

const stars = new THREE.Points(starGeometry, starMaterial);

scene.add(stars);

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;
  camera.lookAt(0, 0, 0);
  stars.rotation.y = elapsedTime/8
  particle.rotation.y = elapsedTime/8
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
