import P5 from 'p5';

P5.prototype.createSquareCanvas = function createSquareCanvas(size, renderer) {
  this.createCanvas(size, size, renderer);
};
