export const COLORS = {
  RED: vec3(1.0, 0.0, 0.0),
  GREEN: vec3(0.0, 1.0, 0.0),
  BLUE: vec3(0.0, 0.0, 1.0),
  BLACK: vec3(0.0, 0.0, 0.0),
};

export default function makeTriangle(a, b, c, color) {
  // Add colors and vertices for one triangle
  let colors = [];
  let positions = [];

  colors.push(color);
  positions.push(a);
  colors.push(color);
  positions.push(b);
  colors.push(color);
  positions.push(c);

  return { colors, positions };
}
