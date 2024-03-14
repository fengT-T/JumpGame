import {
  DirectionalLight,
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

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

// light
const directionLight = new DirectionalLight();
directionLight.position.set(2, 5, -2);
directionLight.shadow.camera.near = 0;
directionLight.shadow.camera.far = 100;
directionLight.shadow.camera.left = -15;
directionLight.shadow.camera.right = 15;
directionLight.shadow.camera.top = 15;
directionLight.shadow.camera.bottom = -15;

const rootGroup = new Group();
