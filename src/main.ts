import { init, render } from "./scene";

async function start() {
  await init();
  render();
}
function restart() {}

start();
