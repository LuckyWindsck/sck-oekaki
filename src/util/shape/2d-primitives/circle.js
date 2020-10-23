import TwoDPrimitive from './2d-primitive';

class Circle extends TwoDPrimitive {
  constructor(center, radius, p5) {
    super(p5);

    this.center = center;
    this.radius = radius;
    this.diameter = radius * 2;
  }

  show(p5 = this.p5) {
    super.show();

    // TODO: support other ellipseMode
    // can get ellipseMode from p5._renderer._ellipseMode
    // check modeAdjust function to implement it
    // https://github.com/processing/p5.js/blob/1237bc86ca3223ec80d99f2a83e6feaa0af8af88/src/core/helpers.js#L7
    p5.circle(this.center.x, this.center.y, this.diameter);
  }
}

export default Circle;
