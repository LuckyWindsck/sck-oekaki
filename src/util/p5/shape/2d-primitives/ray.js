import TwoDPrimitive from './2d-primitive';
import Line from './line';

class Ray extends TwoDPrimitive {
  constructor({ point, theta }) {
    super();

    this.point = point;
    this.theta = theta;

    this.radius = 0;
    this.line = new Line({
      startPoint: this.point,
      endPoint: this.point,
    });
  }

  _show(p5) {
    this.line.show({ p5 });
  }
}

export default Ray;
