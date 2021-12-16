import makeTetra from "./makeTetra.js";

export default function makeSubdivTetra(a, b, c, d, colors, count) {
  // Check for end of recursion
  const positions = [];
  const _colors = [];

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
