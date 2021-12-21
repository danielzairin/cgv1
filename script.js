import { createIntro, createFigure8 } from "./modules/transformations.js";
import makeSubdivTetra from "./modules/makeSubdivTetra.js";
import input from "./modules/inputs.js";

const canvas = document.querySelector("#gl-canvas");
const gl = canvas.getContext("webgl2");
const button = document.querySelector("#button");

let matrices, instanceMatrix, vertices, colors, lastFrame;

// Configure WebGL
const program = initShaders(gl, "vertex-shader", "fragment-shader");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
gl.useProgram(program);

const BUFFER = {
  COLOR: gl.createBuffer(),
  VERTICES: gl.createBuffer(),
};

const ATTRIBUTE = {
  COLOR: gl.getAttribLocation(program, "color"),
  VERTICES: gl.getAttribLocation(program, "vertices"),
  INSTANCE_MATRIX: gl.getUniformLocation(program, "instanceMatrix"),
};

function loadObject() {
  ({ positions: vertices, colors } = makeSubdivTetra(
    vec3(0.0, 0.0, -0.5),
    vec3(0.0, 0.4714, 0.1666),
    vec3(-0.4083, -0.2357, 0.1666),
    vec3(0.4083, -0.2357, 0.1666),
    [input.color1, input.color2, input.color3, input.color4],
    input.subdiv
  ));

  gl.bindBuffer(gl.ARRAY_BUFFER, BUFFER.VERTICES);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
  gl.vertexAttribPointer(ATTRIBUTE.VERTICES, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(ATTRIBUTE.VERTICES);

  gl.bindBuffer(gl.ARRAY_BUFFER, BUFFER.COLOR);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(ATTRIBUTE.COLOR, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(ATTRIBUTE.COLOR);
}

function loadAnimation() {
  matrices = createIntro(input.rotationSpeed, input.enlargementSpeed);
  instanceMatrix = mat4();
  gl.uniformMatrix4fv(
    ATTRIBUTE.INSTANCE_MATRIX,
    false,
    flatten(instanceMatrix)
  );
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, vertices.length);

  if (!matrices.length) matrices = createFigure8(input.moveSpeed);

  instanceMatrix = mult(instanceMatrix, matrices.shift());
  gl.uniformMatrix4fv(
    ATTRIBUTE.INSTANCE_MATRIX,
    false,
    flatten(instanceMatrix)
  );

  lastFrame = requestAnimationFrame(render);
}

button.addEventListener("click", () => {
  cancelAnimationFrame(lastFrame);
  matrices = createIntro(input.rotationSpeed, input.enlargementSpeed);
  instanceMatrix = mat4();
  loadObject();
  render();
});

loadObject();
loadAnimation();
render();
