import TwoDPrimitive from './2d-primitive';

class Line extends TwoDPrimitive {
  constructor({ startPoint, endPoint }) {
    super();

    this.startPoint = startPoint;
    this.endPoint = endPoint;
  }

  get deltaX() {
    return this.endPoint.x - this.startPoint.x;
  }

  get deltaY() {
    return this.endPoint.y - this.startPoint.y;
  }

  get slope() {
    return this.deltaY / this.deltaX;
  }

  get yIntercept() {
    return this.startPoint.y - this.slope * this.startPoint.x;
  }

  get radius() {
    return Math.hypot(this.deltaX, this.deltaY);
  }

  get theta() {
    return Math.atan(this.slope) + Number(this.deltaX < 0) * Math.PI;
  }

  get orthogonalSlope() {
    return -1 / this.slope;
  }

  _show(p5) {
    p5.line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
  }
}

Line.BySlope = ({
  point,
  slope,
  length = 100,
}) => {
  const theta = Math.atan(slope);
  const startPoint = point.clone().translatePolar({ radius: length, theta });
  const endPoint = point.clone().translatePolar({ radius: length, theta: theta + Math.PI });

  return new Line({ startPoint, endPoint });
};

export default Line;
