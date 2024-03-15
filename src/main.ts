import { WebGLRenderer } from "three";
import { camera, init, scene } from "./scene";

// renderer
const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
const canvas = renderer.domElement;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(canvas);

async function start() {
  await init();
  renderer.render(scene, camera);
}
function restart() {}

start();
