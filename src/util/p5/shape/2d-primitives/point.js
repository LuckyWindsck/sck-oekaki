import TwoDPrimitive from './2d-primitive';
import Coordinate from '../../../math/coordinate';

class Point extends TwoDPrimitive {
  constructor({ x = 0, y = 0 }) {
    super();

    this.x = x;
    this.y = y;
  }

  clone() {
    return new Point({
      x: this.x,
      y: this.y,
    });
  }

  translate({ x = 0, y = 0 } = {}) {
    this.x += x;
    this.y += y;

    return this;
  }

  translatePolar({ radius, theta }) {
    this.translate(Coordinate.polar2cartesian({ radius, theta }));

    return this;
  }

  distance(point) {
    return Math.hypot(this.x - point.x, this.y - point.y);
  }

  _show(p5) {
    p5.point(this.x, this.y);
  }
}

Point.Polar = ({ radius = 0, theta = 0 }) => (
  new Point(Coordinate.polar2cartesian({ radius, theta }))
);

export default Point;
