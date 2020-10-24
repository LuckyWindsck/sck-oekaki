<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/p5/shape/2d-primitives/point';
import Line from '../util/p5/shape/2d-primitives/line';
import Circle from '../util/p5/shape/2d-primitives/circle';
import '../util/p5/rendering/extend';

const sketch = (p5) => {
  const randomSign = () => (p5.random(0, 1) > 0.5 ? 1 : -1);

  const createPointInCircle = (circle) => {
    const x = randomSign() * p5.random(0, circle.radius);
    const y = randomSign() * p5.random(0, Math.sqrt(circle.radius ** 2 - x ** 2));

    return new Point(x + circle.center.x, y + circle.center.y);
  };

  const canvasSize = 800;
  const center = new Point(canvasSize / 2, canvasSize / 2);
  const radius = canvasSize * 0.4;
  const circle = new Circle(center, radius, p5);

  p5.setup = () => {
    p5.createSquareCanvas(canvasSize);
    p5.background('white');

    circle.show();
  };

  p5.draw = () => {
    const line = new Line(...Array(2).fill(circle).map(createPointInCircle), p5);

    line.show();
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
