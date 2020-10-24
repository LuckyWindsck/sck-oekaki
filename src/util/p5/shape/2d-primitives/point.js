import TwoDPrimitive from './2d-primitive';

class Point extends TwoDPrimitive {
  constructor(x, y, p5) {
    super(p5);

    this.x = x;
    this.y = y;
  }

  show(option) {
    super.show(option, (p5) => {
      p5.point(this.x, this.y);
    });
  }
}

export default Point;
