class TwoDPrimitive {
  constructor(p5) {
    this.p5 = p5;
  }

  show() {
    if (!this.p5) {
      throw Error('Need to provide a p5 instance for drawing');
    }
  }
}

export default TwoDPrimitive;
