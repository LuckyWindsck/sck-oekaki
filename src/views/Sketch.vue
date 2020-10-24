<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/p5/shape/2d-primitives/point';
import Line from '../util/p5/shape/2d-primitives/line';
import Ray from '../util/p5/shape/2d-primitives/ray';
import Circle from '../util/p5/shape/2d-primitives/circle';
import '../util/p5/rendering/extend';
import Coordinate from '../util/math/coordinate';

const sketch = (p5) => {
  const randomSign = () => (p5.random(0, 1) > 0.5 ? 1 : -1);

  const createPointInCircle = (circle) => {
    const x = randomSign() * p5.random(0, circle.radius);
    const y = randomSign() * p5.random(0, Math.sqrt(circle.radius ** 2 - x ** 2));

    return new Point(x + circle.center.x, y + circle.center.y, p5);
  };

  const solveQuadratic = (a, b, c) => {
    const discriminant = b ** 2 - 4 * a * c;
    const [x1, x2] = [
      (-b + Math.sqrt(discriminant)) / (2 * a),
      (-b - Math.sqrt(discriminant)) / (2 * a),
    ];

    return [x1, x2];
  };

  const solveRayCircleIntersection = (ray, circle) => {
    const { point, theta } = ray;
    const { center, radius } = circle;

    const slope = Math.tan(theta);
    const yIntercept = point.y - slope * point.x;
    const circleCenterNorm = Math.hypot(center.x, center.y);

    // { (x - center.x) ** 2 + (y - center.y) ** 2 = radius ** 2
    // { y = slope * x + rayYIntercept
    // => a * (x ** 2) + b * x + c = 0
    const [a, b, c] = [
      slope ** 2 + 1,
      2 * (slope * (yIntercept - center.y) - center.x),
      circleCenterNorm ** 2 - radius ** 2 - 2 * yIntercept * center.y + yIntercept ** 2,
    ];

    const [x1, x2] = solveQuadratic(a, b, c);

    const x = Math.sign(Math.cos(theta)) > 0 ? Math.max(x1, x2) : Math.min(x1, x2);
    const y = slope * x + yIntercept;

    const intersection = new Point(x, y, p5);

    return intersection;
  };

  const createLineThroughPointWithGivenSlope = (point, slope, length = 100) => {
    const auxiliaryPoint1 = point.clone().translate(
      ...Coordinate.polar2cartesian(length, Math.atan(slope)),
    );

    const auxiliaryPoint2 = point.clone().translate(
      ...Coordinate.polar2cartesian(length, Math.atan(slope) + Math.PI),
    );

    const line = new Line(auxiliaryPoint1, auxiliaryPoint2, p5);

    return line;
  };

  const canvasSize = 800;
  const center = new Point(canvasSize / 2, canvasSize / 2, p5);
  const radius = canvasSize * 0.4;
  const circle = new Circle(center, radius, p5);

  const fps = 60;

  const startPoint = createPointInCircle(circle);
  const startTheta = p5.random(-Math.PI, Math.PI);
  const ray = new Ray(startPoint, startTheta, p5);

  const intersection = solveRayCircleIntersection(ray, circle);
  const normalLine = new Line(center, intersection, p5);

  const tangentSlope = -1 / normalLine.slope;
  const tangentLine = createLineThroughPointWithGivenSlope(intersection, tangentSlope);

  p5.setup = () => {
    p5.createSquareCanvas(canvasSize);
    p5.frameRate(fps);

    p5.background('white');
    circle.show();

    ray.frameStarted = p5.frameCount;
  };

  p5.draw = () => {
    startPoint.show({ strokeWeight: 10 });
    center.show({ strokeWeight: 10 });
    intersection.show({ strokeWeight: 10 });
    normalLine.show();
    tangentLine.show({ stroke: 'blue' });

    const distance = Math.sign(Math.cos(ray.theta)) * (intersection.x - ray.line.point2.x);

    if (distance > 0) {
      ray.framePassed = p5.frameCount - ray.frameStarted;
      // TODO: change radius increasing rate
      ray.radius = ray.framePassed;

      const [x, y] = Coordinate.polar2cartesian(ray.framePassed, ray.theta);
      ray.line.point2 = ray.point.clone().translate(x, y);

      ray.show();
    }
  };
};

export default {
  name: 'Sketch',
  mounted() {
    this.p5 = new P5(sketch, 'sketch');
  },
};
</script>

<style>
</style>
