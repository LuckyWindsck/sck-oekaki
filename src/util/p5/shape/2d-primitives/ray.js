// import TwoDPrimitive from './2d-primitive';
import Line from './line';

class Ray extends Line {
  constructor({ point, theta }) {
    super({
      startPoint: point,
      endPoint: point,
    });

    this.theta = theta;
  }
}

export default Ray;
