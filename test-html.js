var renderer = require('./dist/renderer/renderer-engine');

var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl2");
if (!gl) {
  return;
}

renderer.initializeRenderer(canvas, 640, 480);

setInterval(() => {
  requestAnimationFrame(drawScene);
  renderer.applyUserInput({}, {});
  renderer.drawScene(gl, 0);
}, 1000 / 30);
