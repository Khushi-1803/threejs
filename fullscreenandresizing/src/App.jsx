import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Canvas
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    //Fullscreen not working
    window.addEventListener('dblclick',()=>{
      if(!document.fullscreenElement){
         canvas.requestFullscreen();
      }else{
        document.exitFullscreen()
        
      }
      
    })

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);

    

    scene.add(mesh);

    // Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height
    );
    camera.position.z = 3;
    scene.add(camera);
    
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);

    
    //Resizing
    window.addEventListener('resize',()=>{
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      console.log(sizes.width);
      camera.aspect = sizes.width/sizes.height
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width,sizes.height) 
      renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)) 
       renderer.render(scene, camera);    
    })
  }, []);

  

  return <canvas ref={canvasRef} className="webgl"></canvas>;
}
