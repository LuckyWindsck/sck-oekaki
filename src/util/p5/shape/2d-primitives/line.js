import TwoDPrimitive from './2d-primitive';

class Line extends TwoDPrimitive {
  constructor(point1, point2, p5) {
    // TODO: check whether conflict exists in p5 property of two points and the p5 parameter
    super(p5);

    this.point1 = point1;
    this.point2 = point2;
  }

  get deltaX() {
    return this.point2.x - this.point1.x;
  }

  get deltaY() {
    return this.point2.y - this.point1.y;
  }

  get slope() {
    return this.deltaY / this.deltaX;
  }

  get yIntercept() {
    return this.point1.y - this.slope * this.point1.x;
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

  show(option) {
    super.show(option, (p5) => {
      p5.line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    });
  }
}

export default Line;
