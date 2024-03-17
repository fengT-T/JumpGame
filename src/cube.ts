import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import { objList } from "./obj.conf";
import { Vector3 } from "three";

function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextPosition() {}

export async function createClue(position: Vector3) {
  const index = randomRange(0, 19);
  const name = objList[index];
  const mtlLoader = new MTLLoader();
  const objLoader = new OBJLoader();
  const mtl = await mtlLoader.loadAsync(`/obj/${name}.mtl`);
  mtl.preload();
  objLoader.setMaterials(mtl);
  const obj = await objLoader.loadAsync(`/obj/${name}.obj`);

  Object.assign(obj.scale, {
    x: 0.4,
    y: 0.415,
    z: 0.415,
  });

  Object.assign(obj.position, position);
  // obj.position.x = 0;
  // obj.position.y = 2;
  // obj.position.z = -2;

  obj.castShadow = true;
  obj.traverse((o) => (o.castShadow = true));
  return obj;
}
