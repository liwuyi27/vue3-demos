export function isBlank(value: string) {
  const regx = /^\s+$/;
  return regx.test(value);
}

export function trimLineChar(content: string) {
  return content.replace(/^\r\n/, '').replace(/\r\n$/, '');
}