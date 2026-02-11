import * as THREE from "three";


// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const geometry = new THREE.BoxGeometry(1, 1, 1,5,5,5);
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
const aspectRatio = sizes.width/sizes.height;

/**
 * Camera
 */
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,1,3.4641016151377544);
const camera = new THREE.OrthographicCamera(-1 * aspectRatio,1 * aspectRatio,1,-1,0.1,10)
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 2;
console.log(mesh.position.distanceTo(camera.position));

scene.add(camera);
camera.lookAt(mesh.position)  

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now();
let clock = new THREE.Clock();

const tick = () => {
  
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
  
}
tick()