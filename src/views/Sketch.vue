<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/p5/shape/2d-primitives/point';
import Circle from '../util/p5/shape/2d-primitives/circle';
import Ray from '../util/p5/shape/2d-primitives/ray';
import '../util/p5/rendering/extend';
import RayReflectInCircle from '../util/sketch/ray-reflection/ray-reflection-in-circle';

const sketch = (p5) => {
  const canvasSize = 800;
  const fps = 60;

  const randomSign = () => (p5.random(0, 1) > 0.5 ? 1 : -1);

  const createPointInCircle = (circle) => {
    const x = randomSign() * p5.random(0, circle.radius);
    const y = randomSign() * p5.random(0, Math.sqrt(circle.radius ** 2 - x ** 2));

    return circle.center.clone().translate({ x, y });
  };

  const circle = new Circle({
    center: new Point({
      x: canvasSize / 2,
      y: canvasSize / 2,
    }),
    radius: canvasSize * 0.4,
  });

  let rayReflection = new RayReflectInCircle({
    ray: new Ray({
      point: createPointInCircle(circle),
      theta: p5.random(-Math.PI, Math.PI),
    }),
    circle,
  });

  p5.setup = () => {
    p5.createSquareCanvas(canvasSize);
    p5.frameRate(fps);

    p5.background('white');
    circle.show({ p5 });
  };

  p5.draw = () => {
    if (rayReflection.isIntersected) {
      rayReflection = new RayReflectInCircle({
        ray: new Ray({
          point: rayReflection.intersection,
          theta: rayReflection.reflection.theta,
        }),
        circle,
      });
    }

    rayReflection.showAuxiliary({ p5 });
    rayReflection.ray.show({ p5 });
    rayReflection.update({ p5 });
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
