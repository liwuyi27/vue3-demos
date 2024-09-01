export function isBlank(value: string) {
  const regx = /^\s*$/;
  return regx.test(value);
}

export function trimLineChar(content: string) {
  return content.replace(/^\r\n/, '').replace(/\r\n$/, '');
}

export function random(min: number, max: number): number {
  if (min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
