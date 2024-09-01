import type { DrawState } from "./types";

export class Sun {
  public centerX: number;
  public centerY: number;
  public radius: number;
  public orbitRadius: number;
  public color = 'yellow';
  public alpha = 0.7;
  constructor(public drawState: DrawState) {
    this.centerX = this.drawState.width / 2;
    this.centerY = this.drawState.height / 2;
    this.radius = Math.min(this.centerX, this.centerY) / 5;
    this.orbitRadius = this.radius * 3;
    this.radius = Math.floor(this.radius);
  }

  draw() {
    const ctx = this.drawState.ctx;
    ctx.beginPath();
    ctx.moveTo(this.centerX, this.centerY);
    // 太阳
    ctx.fillStyle = this.color;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 50;
    ctx.shadowColor = `rgba(255, 165, 0, ${this.alpha})`;
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.fill();
    // 轨道
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(0, 255, 255, 0.15)';
    ctx.lineWidth = 1;
    ctx.arc(this.centerX, this.centerY, this.orbitRadius, 0, Math.PI * 2);
    ctx.stroke();
  }

}