/* eslint-disable max-len */
import Point from '../../p5/shape/2d-primitives/point';
import Line from '../../p5/shape/2d-primitives/line';
import LineBySlope from '../../p5/shape/2d-primitives/line-by-slope';
import Ray from '../../p5/shape/2d-primitives/ray';
import Quadratic from '../../math/polynomial/quadratic';

class RayReflectInCircle {
  constructor(circle, point, theta, p5) {
    this.circle = circle;
    this.point = point;
    this.theta = theta;
    this.p5 = p5;

    const tangentLength = 100;

    this.ray = new Ray(point, theta, p5);

    this.intersection = this._intersection();
    this.normal = new Line(circle.center, this.intersection, p5);
    this.tangent = new LineBySlope(this.intersection, this.normal.orthogonalSlope, tangentLength, p5);

    this.reflection = {
      length: point.distance(this.intersection),
      theta: 2 * this.normal.theta - this.ray.theta + Math.PI,
    };

    this.reflection.point = this.intersection.clone().translatePolar(this.reflection.length, this.reflection.theta);
    this.reflection.line = new Line(this.intersection, this.reflection.point, p5);
  }

  get distanceRemaining() {
    return Math.sign(Math.cos(this.ray.theta)) * (this.intersection.x - this.ray.line.point2.x);
  }

  get isIntersected() {
    return this.distanceRemaining <= 0;
  }

  _intersection() {
    const { point, theta } = this.ray;
    const { center, radius } = this.circle;

    const slope = Math.tan(theta);
    const yIntercept = point.y - slope * point.x;
    const circleCenterNorm = Math.hypot(center.x, center.y);

    // { (x - center.x) ** 2 + (y - center.y) ** 2 = radius ** 2
    // { y = slope * x + rayYIntercept
    // => a * (x ** 2) + b * x + c = 0
    const equation = new Quadratic(
      slope ** 2 + 1,
      2 * (slope * (yIntercept - center.y) - center.x),
      circleCenterNorm ** 2 - radius ** 2 - 2 * yIntercept * center.y + yIntercept ** 2,
    );

    const [x1, x2] = equation.zeroes;
    const x = (Math.sign(Math.cos(theta)) * Math.abs(x1 - x2) + (x1 + x2)) / 2;
    const y = slope * (x - point.x) + point.y;

    const intersection = new Point(x, y, this.p5);

    return intersection;
  }

  showAuxiliary() {
    this.circle.center.show({ strokeWeight: 10 });
    this.point.show({ strokeWeight: 10 });
    this.intersection.show({ strokeWeight: 10 });
    this.normal.show();
    this.tangent.show({ stroke: 'blue' });
    this.reflection.point.show({ stroke: 'red', strokeWeight: 10 });
    this.reflection.line.show({ stroke: 'red' });
  }

  update() {
    this.ray.framePassed = this.p5.frameCount - this.ray.frameStarted;
    // TODO: change radius increasing rate
    this.ray.radius = this.ray.framePassed;
    this.ray.line.point2 = this.ray.point.clone().translatePolar(this.ray.radius, this.ray.theta);
  }
}

export default RayReflectInCircle;
