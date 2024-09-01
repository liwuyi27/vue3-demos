import type { Earth } from "./earth";
import type { DrawState } from "./types";

export class Moon {
  public radius = 4;
  public centerX = 0;
  public centerY = 0;
  constructor(public drawState: DrawState, public earth: Earth) {

  }

  draw() {
    const ctx = this.drawState.ctx;
    const date = new Date();
    const rotateAngle = (2 * Math.PI / 6) * date.getSeconds() + (2 * Math.PI / 6000) * date.getMilliseconds();
    this.centerX = this.earth.centerX + Math.cos(2 * Math.PI - rotateAngle) * this.earth.orbitRadius;
    this.centerY = this.earth.centerY - Math.sin(2 * Math.PI - rotateAngle) * this.earth.orbitRadius;
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}