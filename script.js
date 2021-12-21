import { createIntro, createFigure8 } from "./modules/transformations.js";
import makeSubdivTetra from "./modules/makeSubdivTetra.js";
import input from "./modules/inputs.js";

const canvas = document.querySelector("#gl-canvas");
const gl = canvas.getContext("webgl2");
const button = document.querySelector("#button");

let transformations, matrix, positions, colors, lastFrame;

// Configure WebGL
const program = initShaders(gl, "vertex-shader", "fragment-shader");
gl.viewport(0, 0, canvas.width, canvas.height);
gl.clearColor(0, 0, 0, 1);
gl.enable(gl.DEPTH_TEST);
gl.useProgram(program);

const BUFFER = {
  COLOR: gl.createBuffer(),
  POSITIONS: gl.createBuffer(),
};

const LOCATION = {
  COLOR: gl.getAttribLocation(program, "aColor"),
  POSITION: gl.getAttribLocation(program, "aPosition"),
  MATRIX: gl.getUniformLocation(program, "uMatrix"),
};

function loadObject() {
  ({ positions, colors } = makeSubdivTetra(
    vec3(0.0, 0.0, -0.5),
    vec3(0.0, 0.4714, 0.1666),
    vec3(-0.4083, -0.2357, 0.1666),
    vec3(0.4083, -0.2357, 0.1666),
    [input.color1, input.color2, input.color3, input.color4],
    input.subdiv
  ));

  gl.bindBuffer(gl.ARRAY_BUFFER, BUFFER.POSITIONS);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
  gl.vertexAttribPointer(LOCATION.POSITION, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(LOCATION.POSITION);

  gl.bindBuffer(gl.ARRAY_BUFFER, BUFFER.COLOR);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
  gl.vertexAttribPointer(LOCATION.COLOR, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(LOCATION.COLOR);
}

function loadAnimation() {
  transformations = createIntro(input.rotationSpeed, input.enlargementSpeed);
  matrix = mat4();
  gl.uniformMatrix4fv(LOCATION.MATRIX, false, flatten(matrix));
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length);

  if (!transformations.length) transformations = createFigure8(input.moveSpeed);

  matrix = mult(matrix, transformations.shift());
  gl.uniformMatrix4fv(LOCATION.MATRIX, false, flatten(matrix));

  lastFrame = requestAnimationFrame(render);
}

button.addEventListener("click", () => {
  cancelAnimationFrame(lastFrame);
  transformations = createIntro(input.rotationSpeed, input.enlargementSpeed);
  matrix = mat4();
  loadObject();
  render();
});

loadObject();
loadAnimation();
render();
