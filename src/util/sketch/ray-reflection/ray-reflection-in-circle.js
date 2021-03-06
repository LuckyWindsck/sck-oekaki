/* eslint-disable max-len */
import Point from '../../p5/shape/2d-primitives/point';
import Line from '../../p5/shape/2d-primitives/line';
import Quadratic from '../../math/polynomial/quadratic';

class RayReflectInCircle {
  constructor({ ray, circle }) {
    this.ray = ray;
    this.circle = circle;

    const tangentLength = 100;

    this.intersection = this._intersection();

    this.normal = new Line({
      startPoint: circle.center,
      endPoint: this.intersection,
    });

    this.tangent = new Line.BySlope({
      point: this.intersection,
      slope: this.normal.orthogonalSlope,
      length: tangentLength,
    });

    this.reflection = {
      length: this.ray.startPoint.distanceFrom(this.intersection),
      theta: 2 * this.normal.theta - this.ray.theta + Math.PI,
    };

    this.reflection.point = this.intersection.clone().translatePolar({
      radius: this.reflection.length,
      theta: this.reflection.theta,
    });

    this.reflection.line = new Line({
      startPoint: this.intersection,
      endPoint: this.reflection.point,
    });
  }

  get distanceRemaining() {
    return Math.sign(Math.cos(this.ray.theta)) * (this.intersection.x - this.ray.endPoint.x);
  }

  get isIntersected() {
    return this.distanceRemaining <= 0;
  }

  _intersection() {
    const { slope, theta, intercept } = this.ray;
    const { center, radius } = this.circle;

    const circleCenterNorm = Math.hypot(center.x, center.y);

    // { (x - center.x) ** 2 + (y - center.y) ** 2 = radius ** 2
    // { y = slope * x + rayYIntercept
    // => a * (x ** 2) + b * x + c = 0
    const equation = new Quadratic({
      a: slope ** 2 + 1,
      b: 2 * (slope * (intercept.y - center.y) - center.x),
      c: circleCenterNorm ** 2 - radius ** 2 - 2 * intercept.y * center.y + intercept.y ** 2,
    });

    const [x1, x2] = equation.zeroes;
    const x = (Math.sign(Math.cos(theta)) * Math.abs(x1 - x2) + (x1 + x2)) / 2;
    const y = slope * x + intercept.y;

    const intersection = new Point({ x, y });

    return intersection;
  }

  showAuxiliary({ p5 }) {
    this.circle.center.show({ p5, strokeWeight: 10 });
    this.ray.startPoint.show({ p5, strokeWeight: 10 });
    this.intersection.show({ p5, strokeWeight: 10 });
    this.normal.show({ p5 });
    this.tangent.show({ p5, stroke: 'blue' });
    this.reflection.point.show({ p5, stroke: 'red', strokeWeight: 10 });
    this.reflection.line.show({ p5, stroke: 'red' });
  }

  update({ p5 }) {
    if (!this.ray.frameStarted) this.ray.frameStarted = p5.frameCount;
    this.ray.framePassed = p5.frameCount - this.ray.frameStarted;
    // TODO: change radius increasing rate
    this.ray.radius = this.ray.framePassed;
  }

  show({ p5 }) {
    this.showAuxiliary({ p5 });
    this.ray.show({ p5 });
    this.update({ p5 });
  }
}

export default RayReflectInCircle;
