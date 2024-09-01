import type { Sun } from "./sun";
import type { DrawState } from "./types";

export class Earth {
  public radius = 15;
  public orbitRadius: number;
  public centerX = 0;
  public centerY = 0;
  constructor(public drawState: DrawState, public sun: Sun) {
    this.orbitRadius = this.radius * 3;
  }

  draw() {
    const ctx = this.drawState.ctx;
    const date = new Date();
    const rotateAngle = (2 * Math.PI / 60) * date.getSeconds() + (2 * Math.PI / 60000) * date.getMilliseconds();
    this.centerX = this.sun.centerX + Math.cos(2 * Math.PI - rotateAngle) * this.sun.orbitRadius;
    this.centerY = this.sun.centerY - Math.sin(2 * Math.PI - rotateAngle) * this.sun.orbitRadius;
    ctx.beginPath();
    ctx.fillStyle = 'blue';
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}