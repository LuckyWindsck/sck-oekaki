<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/p5/shape/2d-primitives/point';
import Circle from '../util/p5/shape/2d-primitives/circle';
import '../util/p5/rendering/extend';
import RayReflectInCircle from '../util/sketch/ray-reflection/ray-reflection-in-circle';

const sketch = (p5) => {
  const canvasSize = 800;
  const fps = 60;

  const randomSign = () => (p5.random(0, 1) > 0.5 ? 1 : -1);

  const createPointInCircle = (circle) => {
    const x = randomSign() * p5.random(0, circle.radius);
    const y = randomSign() * p5.random(0, Math.sqrt(circle.radius ** 2 - x ** 2));

    return circle.center.clone().translate(x, y);
  };

  const center = new Point(canvasSize / 2, canvasSize / 2, p5);
  const radius = canvasSize * 0.4;
  const circle = new Circle(center, radius, p5);

  const startPoint = createPointInCircle(circle);
  const startTheta = p5.random(-Math.PI, Math.PI);
  let rayReflection = new RayReflectInCircle(circle, startPoint, startTheta, p5);

  p5.setup = () => {
    p5.createSquareCanvas(canvasSize);
    p5.frameRate(fps);

    p5.background('white');
    circle.show();
  };

  p5.draw = () => {
    if (rayReflection.isIntersected) {
      const { intersection, reflection: { theta } } = rayReflection;
      rayReflection = new RayReflectInCircle(circle, intersection, theta, p5);
    }

    rayReflection.showAuxiliary();
    rayReflection.ray.show();
    rayReflection.update();
  };
};

export default {
  name: 'Sketch',
  mounted() {
    this.sketch = new P5(sketch, 'sketch');
  },
};
</script>

<style>
</style>
