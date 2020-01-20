
const WebglError = require('./error.js');

const initialShaderProgram = async (model, vsource, fsource) => {
  if (!model.gl) throw new WebglError('webglLoss', 'model.gl', 'no found');
  const { gl } = model;
  const ret = { ...model };
  if(!ret.program) {
    ret.program = gl.createProgram();
  };
  const [vshader, fshader] = await Promise.all([loadShader(gl, gl.VERTEX_SHADER, vsource), loadShader(gl, gl.FRAGMENT_SHADER, fsource)]);
  gl.attachShader(ret.program, vshader);
  gl.attachShader(ret.program, fshader);
  gl.linkProgram(ret.program);
  return ret;
};

const loadShader = async (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    throw new WebglError('shaderError', `${type}`, source);
    return null;
  }
  return shader;
};

class Program {
  addToApplication(app, playNow=false) {
    this.app = app;
    this.gl = app.gl;
    playNow && this.play();
  }
}
Program.initialShaderProgram = initialShaderProgram;
Program.loadShader = loadShader;

module.exports = Program;

