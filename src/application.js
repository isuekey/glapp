
const WebglError = require('./error.js');

class Application {
  constructor(canvasQuery, el=document) {
    if (!el) throw new WebglError('errorEnv', canvasQuery, 'it is not in browser env');
    const canvas = el.querySelector(canvasQuery);
    if (!canvas) throw new WebglError('canvasLoss', canvasQuery, 'no found');
    let gl = canvas.getContext('webgl2');
    if (!gl) {
      gl = canvas.getContext('webgl');
    }
    if (!gl) {
      throw new WebglError('notSupport', 'webgl', 'not support webgl');
    }
    this.gl = gl;
    this.programList = [];
    this.map = new WeakMap();
  }
  addPrograms(...programs) {
    const offset = this.programList.length;
    const app = this;
    programs.forEach((ele, idx) => {
      app.programList.push(ele);
      app.map.set(ele, offset + idx);
      ele.addToApplication(app);
    });
  }
  addProgram(program, playNow=false) {
    const offset = this.programList.length;
    const app = this;
    app.programList.push(program);
    app.map.set(program, offset+1);
    program.addToApplication(app, playNow);
  }
  play() {
    if(this.playing) return;
    this.playing = true;
  }
  stop() {
    if(!this.playing) return;
    this.playing = false;
  }
}


