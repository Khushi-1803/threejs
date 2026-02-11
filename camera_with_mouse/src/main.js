import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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


// import * as THREE from "three";
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();

// //Objects
// const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

// scene.add(mesh);
// //Sizes
// const sizes = {
//   width: 800,
//   height: 600,
// };
// const cursor = {
//   x: 0,
//   y: 0,
// };
// window.addEventListener("mousemove", (event) => {
//   cursor.x = event.clientX / sizes.width - 0.5;
//   cursor.y = -1*(event.clientY / sizes.height - 0.5);
//   console.log(cursor.x, cursor.y);
// });


// // Cameera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 2;
// camera.lookAt(mesh.position)
// scene.add(camera);

// //control
// const control = new OrbitControls(camera,canvas);
// control.enableDamping = true

// //Renderer
// const renderer = new THREE.WebGLRenderer({
//   canvas: canvas,
// });
// renderer.setSize(sizes.width, sizes.height);

// const tick = () => {
//   control.update();
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tick);
// };
// tick();
