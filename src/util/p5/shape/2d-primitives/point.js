import TwoDPrimitive from './2d-primitive';

class Point extends TwoDPrimitive {
  constructor(x, y, p5) {
    super(p5);

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

  show(option) {
    super.show(option, (p5) => {
      p5.point(this.x, this.y);
    });
  }
}

export default Point;
