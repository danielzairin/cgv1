export function createIntro(rotationSpeed = 2, growthRate = 1.005) {
  const matrices = [];
  let theta = 0;
  let size = 1;

  while (theta !== -180) {
    matrices.push(rotateZ(-rotationSpeed));
    theta = Math.max(-180, theta - rotationSpeed);
  }

  while (theta !== 180) {
    matrices.push(rotateZ(rotationSpeed));
    theta = Math.min(180, theta + rotationSpeed);
  }

  while (theta !== 0) {
    matrices.push(rotateZ(-rotationSpeed));
    theta = Math.max(0, theta - rotationSpeed);
  }

  while (size !== 1.5) {
    matrices.push(scale(growthRate, growthRate, growthRate));
    size = Math.min(1.5, size + (growthRate - 1));
  }

  return matrices;
}

export function createFreeMove(
  displacement = 0.5,
  moveSpeed = 0.01,
  rotationSpeed = 1
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
