import ANIMATION_FRAMES from "./modules/animationFrames.js";
import makeTetra from "./modules/makeTetra.js";

let canvas;
let gl;
let positions = [];
let colors = [];
let numTimesToSubdivide = 0;

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

  divideTetra(
    vertices[0],
    vertices[1],
    vertices[2],
    vertices[3],
    numTimesToSubdivide
  );

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

function divideTetra(a, b, c, d, count) {
  // Check for end of recursion
  if (count === 0) {
    const tetra = makeTetra(a, b, c, d);
    positions.push(...tetra.positions);
    colors.push(...tetra.colors);
  }

  // Find midpoints of sides
  // divide four smaller tetrahedra
  else {
    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var ad = mix(a, d, 0.5);
    var bc = mix(b, c, 0.5);
    var bd = mix(b, d, 0.5);
    var cd = mix(c, d, 0.5);

    --count;

    divideTetra(a, ab, ac, ad, count);
    divideTetra(ab, b, bc, bd, count);
    divideTetra(ac, bc, c, cd, count);
    divideTetra(ad, bd, cd, d, count);
  }
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
