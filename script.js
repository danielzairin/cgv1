import ANIMATION_FRAMES from "./modules/animationFrames.js";
import makeSubdivTetra from "./modules/makeSubdivTetra.js";

let canvas;
let gl;
let positions = [];
let colors = [];
let numTimesToSubdivide = 1;

let tMatrix = mat4();
let tMatrixLoc;

function init() {
  canvas = document.getElementById("gl-canvas");
  gl = canvas.getContext("webgl2");

  if (!gl) {
    alert("WebGL 2.0 isn't available");
    return;
  }

  //  Initialize our data for the Sierpinski Gasket

  // First, initialize the vertices of our 3D gasket
  // Four vertices on unit circle
  // Intial tetrahedron with equal length sides
  var vertices = [
    vec3(0.0, 0.0, -1.0),
    vec3(0.0, 0.9428, 0.3333),
    vec3(-0.8165, -0.4714, 0.3333),
    vec3(0.8165, -0.4714, 0.3333),
  ];

  const tetras = makeSubdivTetra(
    vertices[0],
    vertices[1],
    vertices[2],
    vertices[3],
    numTimesToSubdivide
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
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Create a buffer object, initialize it, and associate it with the
  // associated attribute variable in our vertex shader
  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  tMatrixLoc = gl.getUniformLocation(program, "tMatrix");
  gl.uniformMatrix4fv(tMatrixLoc, false, flatten(tMatrix));

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, positions.length);

  if (ANIMATION_FRAMES.length)
    tMatrix = mult(tMatrix, ANIMATION_FRAMES.shift());

  gl.uniformMatrix4fv(tMatrixLoc, false, flatten(tMatrix));

  requestAnimationFrame(render);
}

init();
