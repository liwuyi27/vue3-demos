import { random } from "lodash";

export type Star = {
  x: number,
  y: number,
  radius: number,
  color: string
}

const maxRadius = 1;
const baseColor = 'white';
let offset = 0;

export const createStars = (width: number, height: number) => {
  const stars: Star[] = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(0, width),
      y: random(0, height),
      radius: 1,
      color: baseColor
    })
  }
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: random(0, width),
      y: random(0, height),
      radius: random(2),
      color: baseColor
    })
  }
  const len = stars.length;
  for (let i = 0; i < len; i++) {
    const star = stars[i];
    stars.push({
      x: star.x,
      y: star.y + height,
      radius: star.radius,
      color: star.color
    })
  }
  return stars;
}

export const drawStars = (ctx: CanvasRenderingContext2D, stars: Star[], height: number) => {
  for (let i = 0; i < stars.length; i++) {
    ctx.beginPath();
    const star = stars[i];
    ctx.fillStyle = star.color;
    ctx.moveTo(star.x, star.y - offset);
    ctx.arc(star.x, star.y - offset, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  offset += (height / (40 * 60));
  offset = offset % height;
}


