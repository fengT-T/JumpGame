import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { createClue } from "./cube";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let canvas: HTMLCanvasElement;
let scene: Scene;
let gui: GUI;
let controls: OrbitControls;

function initRender() {
  renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.shadowMap.enabled = true;

  canvas = renderer.domElement;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(canvas);
}

function initCamera() {
  camera = new PerspectiveCamera(
    5,
    window.innerWidth / window.innerHeight,
    10,
    1000,
  );
  camera.position.set(150, 150, 150);
  camera.lookAt(0, 0, 0);
  controls = new OrbitControls(camera, renderer.domElement);
  gui.add(camera, "fov", 1, 20).onChange(() => {
    camera.updateProjectionMatrix();
  });
}

function initLight() {
  const directionLight = new DirectionalLight();
  scene.add(directionLight);

  const helper = new DirectionalLightHelper(directionLight, 5);
  helper.visible = false
  gui.add(helper, "visible").name("directionLight");
  scene.add(helper);

  directionLight.position.set(15, 10, 5);
  // directionLight.target.position.set(0, 0, 0);
  directionLight.castShadow = true;
  directionLight.shadow.camera.near = 1;
  directionLight.shadow.camera.far = 100;
  directionLight.shadow.camera.left = -20;
  directionLight.shadow.camera.right = 20;

  const shadowhelper = new DirectionalLightHelper(directionLight, 5);
  shadowhelper.visible= false
  gui.add(shadowhelper, "visible").name("shadowhelper");
  scene.add(shadowhelper);
  const ambientLight = new AmbientLight("white", 2);
  scene.add(ambientLight);
}

function initPlane() {
  const plane = new PlaneGeometry(200, 200, 10, 10);
  const planeMaterial = new MeshPhongMaterial({
    color: "yellow",
  });
  const planeMesh = new Mesh(plane, planeMaterial);
  planeMesh.receiveShadow = true;
  planeMesh.rotation.x = -0.5 * Math.PI;
  planeMesh.position.y = 1;
  scene.add(planeMesh);
}

function* createPosition() {
  let index = 0;
  let startVec = new Vector3(-3, 2, 15);
  while (true) {
    index++;
    yield startVec.add(new Vector3(3, 0, -6));
  }
}
let positionGenrate: Generator<Vector3>;

export async function init() {
  scene = new Scene();
  gui = new GUI();

  initRender();
  initCamera();

  initLight();
  initPlane();

  positionGenrate = createPosition();

  // cube
  scene.add(await createClue(positionGenrate.next().value));
  scene.add(await createClue(positionGenrate.next().value));
  scene.add(await createClue(positionGenrate.next().value));
  scene.add(await createClue(positionGenrate.next().value));
}

let num: number;
export function render() {
  controls.update();
  renderer.render(scene, camera);

  num = requestAnimationFrame(render);
}

export function cancelRender() {
  cancelAnimationFrame(num);
}
