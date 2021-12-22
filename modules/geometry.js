export function makeTriangle(a, b, c, color) {
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

export function makeTetra(a, b, c, d, colors) {
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

export function makeSubdivTetra(a, b, c, d, colors, count) {
  const positions = [];
  const _colors = [];

  // Check for end of recursion
  if (count === 0) {
    return makeTetra(a, b, c, d, colors);
  }

  // Find midpoints of sides divide four smaller tetrahedra
  var ab = mix(a, b, 0.5);
  var ac = mix(a, c, 0.5);
  var ad = mix(a, d, 0.5);
  var bc = mix(b, c, 0.5);
  var bd = mix(b, d, 0.5);
  var cd = mix(c, d, 0.5);

  --count;

  const tetras = [
    makeSubdivTetra(a, ab, ac, ad, colors, count),
    makeSubdivTetra(ab, b, bc, bd, colors, count),
    makeSubdivTetra(ac, bc, c, cd, colors, count),
    makeSubdivTetra(ad, bd, cd, d, colors, count),
  ];

  tetras.forEach((tetra) => {
    positions.push(...tetra.positions);
    _colors.push(...tetra.colors);
  });

  return { positions, colors: _colors };
}
