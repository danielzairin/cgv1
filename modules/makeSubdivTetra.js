import makeTetra from "./makeTetra.js";

export default function makeSubdivTetra(a, b, c, d, count) {
  // Check for end of recursion
  if (count === 0) return [makeTetra(a, b, c, d)];

  // Find midpoints of sides divide four smaller tetrahedra
  var ab = mix(a, b, 0.5);
  var ac = mix(a, c, 0.5);
  var ad = mix(a, d, 0.5);
  var bc = mix(b, c, 0.5);
  var bd = mix(b, d, 0.5);
  var cd = mix(c, d, 0.5);

  --count;

  return [
    ...makeSubdivTetra(a, ab, ac, ad, count),
    ...makeSubdivTetra(ab, b, bc, bd, count),
    ...makeSubdivTetra(ac, bc, c, cd, count),
    ...makeSubdivTetra(ad, bd, cd, d, count),
  ];
}
