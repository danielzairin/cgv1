export function createIntro(rotationSpeed = 1, growthRate = 1.005) {
  const matrices = [];

  for (let i = 0; i < 90; i++) matrices.push(rotateY(-rotationSpeed));
  for (let i = 0; i < 90; i++) matrices.push(rotateY(rotationSpeed));
  for (let i = 0; i < 90; i++) matrices.push(rotateY(rotationSpeed));
  for (let i = 0; i < 90; i++) matrices.push(rotateY(-rotationSpeed));
  for (let i = 0; i < 60; i++) matrices.push(scale(1.005, 1.005, 1.005));

  return matrices;
}

export function createFreeMove(
  displacement = 0.8,
  moveSpeed = 0.01,
  rotationSpeed = 0.5
) {
  const matrices = [];
  let y = 0;

  while (y <= displacement) {
    matrices.push(
      mult(translate(0, moveSpeed, 0), rotate(rotationSpeed, [1, 1, 1]))
    );
    y += moveSpeed;
  }

  while (y >= 0) {
    matrices.push(
      mult(translate(0, -moveSpeed, 0), rotate(rotationSpeed, [1, 1, 1]))
    );
    y -= moveSpeed;
  }

  return matrices;
}
