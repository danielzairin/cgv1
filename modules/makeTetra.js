import makeTriangle from "./makeTriangle.js";

export default function renderTetra(a, b, c, d, colors) {
  const _colors = [];
  const positions = [];
  const triangles = [];

  triangles.push(makeTriangle(a, c, b, colors[0]));
  triangles.push(makeTriangle(a, c, d, colors[1]));
  triangles.push(makeTriangle(a, b, d, colors[2]));
  triangles.push(makeTriangle(b, c, d, colors[3]));

  triangles.forEach((triangle) => {
    positions.push(...triangle.positions);
    _colors.push(...triangle.colors);
  });

  return { colors: _colors, positions };
}
