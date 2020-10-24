<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/p5/shape/2d-primitives/point';
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

  const canvasSize = 800;
  const center = new Point(canvasSize / 2, canvasSize / 2, p5);
  const radius = canvasSize * 0.4;
  const circle = new Circle(center, radius, p5);

  const startPoint = createPointInCircle(circle);
  const startTheta = p5.random(-Math.PI, Math.PI);
  const ray = new Ray(startPoint, startTheta, p5);

  p5.setup = () => {
    p5.createSquareCanvas(canvasSize);

    p5.background('white');
    circle.show();

    ray.frameStarted = p5.frameCount;
  };

  p5.draw = () => {
    startPoint.show({ strokeWeight: 10 });
    center.show({ strokeWeight: 10 });

    ray.framePassed = p5.frameCount - ray.frameStarted;
    // TODO: change radius increasing rate
    ray.radius = ray.framePassed;

    const [x, y] = Coordinate.polar2cartesian(ray.framePassed, ray.theta);
    ray.line.point2 = ray.point.clone().translate(x, y);

    ray.show();
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
