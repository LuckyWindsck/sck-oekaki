<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/shape/2d-primitives/point';
import Circle from '../util/shape/2d-primitives/circle';
import '../util/rendering/extend';

const sketch = (p5) => {
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
