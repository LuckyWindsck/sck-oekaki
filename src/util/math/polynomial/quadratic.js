import Polynomial from './polynomial';

class Quadratic extends Polynomial {
  constructor({ a = 0, b = 0, c = 0 } = {}) {
    super();

    this.a = a;
    this.b = b;
    this.c = c;
  }

  get discriminant() {
    return this.b ** 2 - 4 * this.a * this.c;
  }

  get zeroes() {
    // TODO: implement complex zeroes
    if (this.discriminant < 0) return [];

    return [1, -1].map((sign) => (
      (-this.b + sign * Math.sqrt(this.discriminant)) / (2 * this.a)
    ));
  }
}

export default Quadratic;
