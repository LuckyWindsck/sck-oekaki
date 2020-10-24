import TwoDPrimitive from './2d-primitive';

class Point extends TwoDPrimitive {
  constructor(x, y, p5) {
    super(p5);

    this.x = x;
    this.y = y;
  }

  show(p5 = this.p5) {
    super.show();

    p5.point(this.x, this.y);
  }
}

export default Point;
