let fft;
let mic;
var audioContext;
const size = 512;

let cols, rows;
let w, h;
let x = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9, 512);
  fft.setInput(mic);
  cols = 20;
  rows = 20;
  w = 40;
}

function mousePressed() {
  let fs = fullscreen();
  fullscreen(!fs); 
}

function draw() {
  background(0);
  let spectrum = fft.analyze();
  let waveform = fft.waveform();
  rotateX(90);
  translate(-360, -400, -height / 4);
  //stroke('#fe00fe');
  fill(0);
  stroke(255);
  smooth();
  let i = 0;
  //background(spectrum[i] + 125, 0, 0);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let val;
      if (spectrum[i] == null) {
        val = 0;
      } else {
        //val = map(spectrum[i], 0, 255, 0, 400);
        val = spectrum[i];
      }
      push();
      translate(x * w, y * w);
      box(w, w, val * 1.5);
      pop();
      i++;
    }
  }

  translate(0, 400, height  / 3);
  noFill();
  beginShape();
  strokeWeight(0.5);
  stroke(255);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
  console.log(frameRate());
}