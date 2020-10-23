<template>
  <div id="sketch"></div>
</template>

<script>
import P5 from 'p5';
import '../util/rendering/extend';

const sketch = (p5) => {
  const canvasSize = 800;

  p5.setup = () => {
    p5.createSquareCanvas(canvasSize);
  };

  p5.draw = () => {
    p5.background(220);
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
