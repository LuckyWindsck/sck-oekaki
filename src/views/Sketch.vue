<template>
  <div>
    <button @click="resetSketch">Reset</button>
    <div id="sketch" @dblclick="triggerEasterEgg"></div>
  </div>
</template>

<script>
import P5 from 'p5';
import Point from '../util/p5/shape/2d-primitives/point';
import Circle from '../util/p5/shape/2d-primitives/circle';
import Ray from '../util/p5/shape/2d-primitives/ray';
import '../util/p5/rendering/extend';
import RayReflectInCircle from '../util/sketch/ray-reflection/ray-reflection-in-circle';

export default {
  name: 'Sketch',
  data() {
    return {
      canvasSize: 800,
      fps: 60,
      circle: undefined,
      rayReflection: undefined,
      shouldShowEasterEgg: false,
    };
  },
  methods: {
    triggerEasterEgg() {
      this.isEasterEggTriggered = !this.isEasterEggTriggered;
    },
    randomSign() {
      return this.sketch.random(0, 1) > 0.5 ? 1 : -1;
    },
    createPointInCircle(circle) {
      const x = this.randomSign() * this.sketch.random(0, circle.radius);
      const y = this.randomSign() * this.sketch.random(0, Math.sqrt(circle.radius ** 2 - x ** 2));

      return circle.center.clone().translate({ x, y });
    },
    init(p5) {
      p5.setup = () => {
        p5.createSquareCanvas(this.canvasSize);
        this.resetSketch();
      };

      p5.draw = () => {
        if (this.isEasterEggTriggered || this.rayReflection.isIntersected) {
          this.rayReflection = new RayReflectInCircle({
            ray: new Ray({
              point: this.rayReflection.intersection,
              theta: this.rayReflection.reflection.theta,
            }),
            circle: this.circle,
          });
        }

        this.rayReflection.showAuxiliary({ p5 });
        this.rayReflection.ray.show({ p5 });
        this.rayReflection.update({ p5 });
      };
    },
    resetSketch() {
      this.sketch.frameRate(this.fps);

      this.circle = new Circle({
        center: new Point({
          x: this.canvasSize / 2,
          y: this.canvasSize / 2,
        }),
        radius: this.canvasSize * 0.4,
      });

      this.rayReflection = new RayReflectInCircle({
        ray: new Ray({
          point: this.createPointInCircle(this.circle),
          theta: this.sketch.random(-Math.PI, Math.PI),
        }),
        circle: this.circle,
      });
      this.sketch.background('white');
      this.circle.show({ p5: this.sketch });
    },
  },
  mounted() {
    this.sketch = new P5(this.init, 'sketch');
  },
};
</script>

<style>
</style>
