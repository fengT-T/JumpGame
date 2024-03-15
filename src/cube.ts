import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

export async function createClue() {
  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  const mtl = await mtlLoader.loadAsync("/obj/cd.mtl");
  mtl.preload();
  objLoader.setMaterials(mtl);
  const obj = await objLoader.loadAsync("/obj/cd.obj");

  // Object.assign(obj.scale, {
  //   x: 0.4,
  //   y: 0.415,
  //   z: 0.415,
  // });
  obj.scale.x = 0.4;
  obj.scale.y = 0.4;
  obj.scale.z = 0.4;

  obj.position.x = 0;
  obj.position.y = 0;
  obj.position.z = -2;

  return obj;
}
