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

export function createFigure8(moveSpeed = 0.01) {
  const matrices = [];
  const d = 0.3;
  let x = 0;
  let y = 0;

  while (x !== -d && y !== -d) {
    const t = translate(-moveSpeed, -moveSpeed, 0);
    x = Math.max(x - moveSpeed, -d);
    y = Math.max(y - moveSpeed, -d);
    matrices.push(t);
  }

  while (x !== d) {
    const t = translate(moveSpeed, 0, 0);
    x = Math.min(x + moveSpeed, d);
    matrices.push(t);
  }

  while (x !== -d && y !== d) {
    const t = translate(-moveSpeed, moveSpeed, 0);
    x = Math.max(x - moveSpeed, -d);
    y = Math.min(y + moveSpeed, d);
    matrices.push(t);
  }

  while (x !== d) {
    const t = translate(moveSpeed, 0, 0);
    x = Math.min(x + moveSpeed, d);
    matrices.push(t);
  }

  while (x !== 0 && y !== 0) {
    const t = translate(-moveSpeed, -moveSpeed, 0);
    x = Math.max(x - moveSpeed, 0);
    y = Math.max(y - moveSpeed, 0);
    matrices.push(t);
  }

  return matrices;
}
