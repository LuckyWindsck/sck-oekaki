import TwoDPrimitive from './2d-primitive';
import Coordinate from '../../../math/coordinate';

class Point extends TwoDPrimitive {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point(this.x, this.y, this.p5);
  }

  translateX(x) {
    this.x += x;

    return this;
  }

  translateY(y) {
    this.y += y;

    return this;
  }

  translate(x, y) {
    this.translateX(x);
    this.translateY(y);

    return this;
  }

  translatePolar(radius, theta) {
    const [x, y] = Coordinate.polar2cartesian(radius, theta);

    this.translateX(x);
    this.translateY(y);

    return this;
  }

  distance(point) {
    return Math.hypot(this.x - point.x, this.y - point.y);
  }

  _show(p5) {
    p5.point(this.x, this.y);
  }
}

export default Point;
