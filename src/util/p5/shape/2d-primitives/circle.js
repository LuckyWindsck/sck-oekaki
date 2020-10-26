import TwoDPrimitive from './2d-primitive';

class Circle extends TwoDPrimitive {
  constructor({ center, radius }) {
    super();

    this.center = center;
    this.radius = radius;
    this.diameter = radius * 2;
  }

  _show(p5) {
    // TODO: support other ellipseMode
    // can get ellipseMode from p5._renderer._ellipseMode
    // check modeAdjust function to implement it
    // https://github.com/processing/p5.js/blob/1237bc86ca3223ec80d99f2a83e6feaa0af8af88/src/core/helpers.js#L7
    p5.circle(this.center.x, this.center.y, this.diameter);
  }
}

export default Circle;
