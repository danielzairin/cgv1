export default function parseHexcode(hexcode) {
  const str = hexcode.replace("#", "");
  const r = Number.parseInt(`${str[0]}${str[1]}`, 16) / 255;
  const g = Number.parseInt(`${str[2]}${str[3]}`, 16) / 255;
  const b = Number.parseInt(`${str[4]}${str[5]}`, 16) / 255;
  return vec3(r, g, b);
}
