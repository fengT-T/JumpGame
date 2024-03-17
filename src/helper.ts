import { GridHelper, AxesHelper, Object3D, Material } from "three";

export class AxisGridHelper {
  public grid: GridHelper;
  public axes = new AxesHelper();
  public _visible = false;

  get visible() {
    return this._visible;
  }

  set visible(v: boolean) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }

  constructor(node: Object3D, units = 10) {
    (this.axes.material as Material).depthTest = false;
    this.axes.renderOrder = 2;
    node.add(this.axes);

    this.grid = new GridHelper(units, units);
    (this.grid.material as Material).depthTest = false;
    this.grid.renderOrder = 1;
    node.add(this.grid);

    this.visible = false;
  }
}
