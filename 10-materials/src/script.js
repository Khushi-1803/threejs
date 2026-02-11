import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js"

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("./textures/door/color.jpg")
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg")
const doorAmbientOcclusion = textureLoader.load("./textures/door/ambientOcclusion.jpg")
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg")
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg")
const doorMetalnessTexture = textureLoader.load("./textures/door/metalness.jpg")
const doorRoughnessTexture = textureLoader.load("./textures/door/roughness.jpg")
const MeshMatcapMaterial = textureLoader.load("./textures/matcaps/1.png")

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
MeshMatcapMaterial.colorSpace = THREE.SRGBColorSpace

const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr",(environmentMap)=>{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = environmentMap;
   scene.environment = environmentMap;
        
})




// Object


//BASIC MATERIAL
//  const material = new THREE.MeshBasicMaterial()

//TEXTURE WITH COLOR AND WIREFRAME
// material.map = doorColorTexture;
// material.color = new THREE.Color("#ff00b3")
// material.wireframe = true 

//OPACITY
// material.transparent = true;
// material.opacity = 0.5

//ALPHAMAP
// material.transparent = true
// material.alphaMap = doorAlphaTexture;



//NORMAL MATERIAL
// const material = new THREE.MeshNormalMaterial();
// material.wireframe = true;
// material.flatShading = true

//MESHMATCAPMATERIAL
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = MeshMatcapMaterial

//MESHDEAPTHMATERIAL
// const material = new THREE.MeshDepthMaterial();


//LAMBERTMATERIAL
// const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff,50);
// pointLight.position.set(2,3,4)
// scene.add(pointLight);

// const material = new THREE.MeshLambertMaterial();
const material = new THREE.MeshStandardMaterial();
material.metalness = 2.5; 
material.map=doorColorTexture;
material.aoMap = doorAmbientOcclusion;
material.alphaMap = doorAlphaTexture;
material.transparent = true;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.3
material.normalMap= doorNormalTexture;



const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1,100, 100), material)
scene.add(plane)

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5
scene.add(sphere)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material)
torus.position.x = 1.5
scene.add(torus)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
scene.add(camera)



// Renderer
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Mouse tracking
const cursor = { x: 0, y: 0 }

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = -(event.clientY / sizes.height - 0.5)
})

// Animate
const clock = new THREE.Clock()
const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  camera.position.x = Math.sin(cursor.x * Math.PI*2)*2;
  camera.position.z = Math.cos(cursor.x * Math.PI*2)*2;
  camera.position.y = (cursor.y * 3);
  camera.lookAt(plane.position);

  // Rotate
  plane.rotation.x = elapsedTime * 0.3
  plane.rotation.y = elapsedTime * 0.3

  sphere.rotation.x = elapsedTime * 0.3
  sphere.rotation.y = elapsedTime * 0.3

  torus.rotation.x = elapsedTime * 0.3
  torus.rotation.y = elapsedTime * 0.3
  

  renderer.render(scene, camera)
  requestAnimationFrame(tick)
}

tick()