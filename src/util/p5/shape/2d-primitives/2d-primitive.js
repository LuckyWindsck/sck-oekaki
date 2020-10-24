class TwoDPrimitive {
  constructor(p5) {
    this.p5 = p5;
  }

  show(
    {
      strokeWeight,
      p5 = this.p5,
    } = {},
    callback = () => {},
  ) {
    if (!this.p5) throw Error('Need to provide a p5 instance for drawing');

    p5.push();
    if (strokeWeight) p5.strokeWeight(strokeWeight);
    callback(p5);
    p5.pop();
  }
}

export default TwoDPrimitive;
