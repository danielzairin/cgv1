import { createIntro, createFreeMove } from "./modules/transformations.js";
import makeSubdivTetra from "./modules/makeSubdivTetra.js";
import parseHexcode from "./utils/parseHexcode.js";

const canvas = document.querySelector("#gl-canvas");
const gl = canvas.getContext("webgl2");
const button = document.querySelector("#button");
const inputs = {
  subdiv: document.querySelector("#input-subdiv"),
  color: [
    document.querySelector("#input-color1"),
    document.querySelector("#input-color2"),
    document.querySelector("#input-color3"),
    document.querySelector("#input-color4"),
  ],
  rotationSpeed: document.querySelector("#input-rotationSpeed"),
  enlargementSpeed: document.querySelector("#input-enlargementSpeed"),
};

let positions;
let colors;
let lastFrame;
let matrices;
let tMatrix;
let tMatrixLoc;

function init() {
  cancelAnimationFrame(lastFrame);
  positions = [];
  colors = [];
  matrices = createIntro(
    Number.parseInt(inputs.rotationSpeed.value),
    Number.parseFloat(inputs.enlargementSpeed.value)
  );
  tMatrix = mat4();

  if (!gl) {
    alert("WebGL 2.0 isn't available");
    return;
  }

  // Initialize our data for the Sierpinski Gasket
  // Intial tetrahedron with equal length sides
  const vertices = [
    vec3(0.0, 0.0, -0.5),
    vec3(0.0, 0.4714, 0.1666),
    vec3(-0.4083, -0.2357, 0.1666),
    vec3(0.4083, -0.2357, 0.1666),
  ];

  const tetras = makeSubdivTetra(
    vertices[0],
    vertices[1],
    vertices[2],
    vertices[3],
    inputs.color.map(({ value }) => parseHexcode(value)),
    Number.parseInt(inputs.subdiv.value)
  );

  tetras.forEach((tetra) => {
    positions.push(...tetra.positions);
    colors.push(...tetra.colors);
  });

  // Configure WebGL
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Enable hidden-surface removal
  gl.enable(gl.DEPTH_TEST);

  // Load shaders and initialize attribute buffers
  const program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Create a buffer object, initialize it, and associate it with the
  // associated attribute variable in our vertex shader
  const cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  const colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  const vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  const positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  tMatrixLoc = gl.getUniformLocation(program, "tMatrix");
  gl.uniformMatrix4fv(tMatrixLoc, false, flatten(tMatrix));

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, positions.length);

  if (!matrices.length) matrices = createFreeMove();

  tMatrix = mult(tMatrix, matrices.shift());
  gl.uniformMatrix4fv(tMatrixLoc, false, flatten(tMatrix));

  lastFrame = requestAnimationFrame(render);
}

button.addEventListener("click", init);

init();
