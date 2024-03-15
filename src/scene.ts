import {
  AmbientLight,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PlaneHelper,
  Scene,
} from "three";
import { createClue } from "./cube";

export let scene: Scene;
export let camera: PerspectiveCamera;
let directionLight: DirectionalLight;
let ambientLight: AmbientLight;

export async function init() {
  scene = new Scene();

  // init camera
  camera = new PerspectiveCamera(
    3,
    window.innerWidth / window.innerHeight,
    1,
    500,
  );
  camera.position.set(100, 100, 100);
  camera.lookAt(0, 0, 0);

  // int light
  directionLight = new DirectionalLight();
  scene.add(directionLight);
  directionLight.position.set(2, 5, -2);
  // TODO: modify this shaow camera
  // directionLight.shadow.camera.near = 0;
  // directionLight.shadow.camera.far = 100;
  // directionLight.shadow.camera.left = -15;
  // directionLight.shadow.camera.right = 15;
  // directionLight.shadow.camera.top = 15;
  // directionLight.shadow.camera.bottom = -15;
  ambientLight = new AmbientLight();
  scene.add(ambientLight);

  // init plane
  const plane = new PlaneGeometry(100, 100, 10, 10);
  const planeMaterial = new MeshBasicMaterial({
    color: "yellow",
  });
  const planeMesh = new Mesh(plane, planeMaterial);
  const helper = new PlaneHelper(plane, 1, 0xffff00);
  scene.add(planeMesh);

  // cube
  scene.add(await createClue());
}
