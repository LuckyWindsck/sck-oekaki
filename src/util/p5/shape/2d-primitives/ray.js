import TwoDPrimitive from './2d-primitive';
import Line from './line';

class Ray extends TwoDPrimitive {
  // theta: [-π, π]
  constructor(point, theta, p5) {
    super(p5);

    this.point = point;
    this.theta = theta;
    this.radius = 0;

    this.line = new Line(this.point, this.point);
  }

  show(option) {
    super.show(option, (p5) => {
      if (!this.line.p5) this.line.p5 = p5;
      this.line.show();
    });
  }
}

export default Ray;
