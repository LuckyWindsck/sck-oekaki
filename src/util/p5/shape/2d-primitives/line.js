import TwoDPrimitive from './2d-primitive';

class Line extends TwoDPrimitive {
  constructor(point1, point2, p5) {
    // TODO: check whether conflict exists in p5 property of two points and the p5 parameter
    super(p5);

    this.point1 = point1;
    this.point2 = point2;

    this.slope = (this.point2.y - this.point1.y) / (this.point2.x - this.point1.x);
  }

  show(p5 = this.p5) {
    super.show();

    p5.line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
  }
}

export default Line;
