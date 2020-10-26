class TwoDPrimitive {
  show({ stroke, strokeWeight, p5 } = {}) {
    if (!p5) throw Error('Need to provide a p5 instance for drawing');

    p5.push();
    if (stroke) p5.stroke(...[stroke].flat());
    if (strokeWeight) p5.strokeWeight(strokeWeight);
    // eslint-disable-next-line no-unused-expressions
    this._show?.(p5);
    p5.pop();
  }
}

export default TwoDPrimitive;
