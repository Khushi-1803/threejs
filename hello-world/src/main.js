import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7,-0.6,1) //same as line 15,16,17
mesh.scale.set(2,0.25,0.5)  //we can scale the project from x,y,z
mesh.rotation.reorder("XYZ") //rotate X-axis first, then Y then Z
  mesh.rotation.y = 2
  mesh.rotation.x = 2

scene.add(mesh);
console.log(mesh.position.length()); //distance of object from center
// mesh.position.normalize() mesh will jump to a point exactly 1 unit from the center, no matter where it was originally.

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
console.log(mesh.position.distanceTo(camera.position)); //distance of object from camera
camera.lookAt(new THREE.Vector3(1,0,1))


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
