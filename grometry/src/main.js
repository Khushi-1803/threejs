// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// // Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // Sizes
// const sizes = {
//   width: window.innerWidth,
//   height: window.innerHeight,
// };

// window.addEventListener("resize", () => {
//   // Update sizes
//   sizes.width = window.innerWidth;
//   sizes.height = window.innerHeight;

//   // Update camera
//   camera.aspect = sizes.width / sizes.height;
//   camera.updateProjectionMatrix();

//   // Update renderer
//   renderer.setSize(sizes.width, sizes.height);
//   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// // Camera
// const camera = new THREE.PerspectiveCamera(
//   75,
//   sizes.width / sizes.height,
//   0.1,
//   100
// );
// camera.position.z = 3;
// scene.add(camera);

// // Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// // Animate
// const clock = new THREE.Clock();

// const tick = () => {
//   const elapsedTime = clock.getElapsedTime();

//   // Update controls
//   controls.update();

//   // Render
//   renderer.render(scene, camera);

//   // Call tick again on the next frame
//   window.requestAnimationFrame(tick);
// };

// tick();
import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
 const geometry = new THREE.SphereGeometry(1, 22,22);

//  const geometry = new THREE.BufferGeometry()
//  const array = new Float32Array([0,0,0,0,1,0,1,0,0])
//  const positionAttribute = new THREE.BufferAttribute(array,3);
//  geometry.setAttribute("position",positionAttribute)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -1*(event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;

scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

const tick = () => {
  camera.position.x = Math.sin(cursor.x * Math.PI*2)*2;
  camera.position.z = Math.cos(cursor.x * Math.PI*2)*2;
  camera.position.y = (cursor.y * 3);
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
