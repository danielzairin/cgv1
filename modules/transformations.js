export function createIntro(rotationSpeed = 1, growthRate = 1.005) {
  const matrices = [];

  for (let i = 0; i < 90; i++) matrices.push(rotateY(-rotationSpeed));
  for (let i = 0; i < 90; i++) matrices.push(rotateY(rotationSpeed));
  for (let i = 0; i < 90; i++) matrices.push(rotateY(rotationSpeed));
  for (let i = 0; i < 90; i++) matrices.push(rotateY(-rotationSpeed));
  for (let i = 0; i < 60; i++) matrices.push(scale(1.005, 1.005, 1.005));

  return matrices;
}
