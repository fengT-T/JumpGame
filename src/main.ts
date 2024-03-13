import { Group, PerspectiveCamera, Scene, WebGLRenderer } from "three";

const scene = new Scene();

// renderer
const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
const canvas = renderer.domElement;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(canvas);

// camera
const camera = new PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  1,
  500,
);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const rootGroup = new Group();
