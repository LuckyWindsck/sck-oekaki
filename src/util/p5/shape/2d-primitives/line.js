import TwoDPrimitive from './2d-primitive';

class Line extends TwoDPrimitive {
  constructor({ startPoint, endPoint }) {
    // TODO: check whether conflict exists in p5 property of two points and the p5 parameter
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

export default Line;
