import makeTriangle, { COLORS } from "./makeTriangle.js";

export default function renderTetra(a, b, c, d) {
  const colors = [];
  const positions = [];
  const triangles = [];

  triangles.push(makeTriangle(a, c, b, COLORS.RED));
  triangles.push(makeTriangle(a, c, d, COLORS.GREEN));
  triangles.push(makeTriangle(a, b, d, COLORS.BLUE));
  triangles.push(makeTriangle(b, c, d, COLORS.BLACK));

  triangles.forEach((triangle) => {
    positions.push(...triangle.positions);
    colors.push(...triangle.colors);
  });

  return { colors, positions };
}
