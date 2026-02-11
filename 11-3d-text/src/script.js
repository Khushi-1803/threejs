import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
import gsap from "gsap"
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

// Fonts
let text = null;
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello Three.js", {
    font: font,
    size: 0.3,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.3,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 10,
  });

  const textMaterial = new THREE.MeshNormalMaterial();
  // textMaterial.wireframe = true;
  text = new THREE.Mesh(textGeometry, textMaterial);
  textGeometry.center();

  scene.add(text);
});

//Heart

for (let i = 0; i < 50; i++) {
  const heartShape = new THREE.Shape();

heartShape.moveTo(0, 0.25);

heartShape.bezierCurveTo(0, 0.25, -0.5, -0.25, -0.5, -0.75);
heartShape.bezierCurveTo(-0.5, -1.25, 0, -1.25, 0, -0.75);
heartShape.bezierCurveTo(0, -1.25, 0.5, -1.25, 0.5, -0.75);
heartShape.bezierCurveTo(0.5, -0.25, 0, 0.25, 0, 0.25);

const heartGeometry = new THREE.ShapeGeometry(heartShape);
heartGeometry.center();

const heartMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});

const heart = new THREE.Mesh(heartGeometry, heartMaterial);
heart.rotation.x = Math.PI
heart.position.x = (Math.random()-0.5)*20
heart.position.y = (Math.random()-0.5)*20
heart.position.z = (Math.random()-0.5)*20
gsap.to(heart.scale,{
  x:0.008,
  y:0.008,
  z:0.008,
  duration:1,
  repeat:-1
})
scene.add(heart);
  
}



/**
 * Object
 */
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -1 * (event.clientY / sizes.height - 0.5);
  console.log(cursor.x, cursor.y);
});

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 2;

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 * Animate
 */
const tick = () => {
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
  camera.position.y = cursor.y * 3;

  if (text) {
    camera.lookAt(text.position);
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
