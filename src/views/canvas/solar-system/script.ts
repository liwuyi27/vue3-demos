import { random } from "lodash";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const w = window.innerWidth;
const h = window.innerHeight;
const hue = 217;
const stars = [];
const maxStars = 1400;
let count = 0;

function maxOrbit(x: number, y: number) {
  const max = Math.max(x, y);
  const diameter = Math.round(Math.sqrt(max * max + max * max));
  return diameter / 2;
}

function Star() {
  this.orbitRadius = random(maxOrbit(w, h));
  this.radius = random(60, this.orbitRadius) / 12;
  this.orbitX = w / 2;
  this.orbitY = h /2;
  this.timePassed = random(0, maxStars);
  this.speed = random(this.orbitRadius) / 500000;
  this.alpha = random(2, 10) / 10;
  count++;
  stars[count] = this;
}