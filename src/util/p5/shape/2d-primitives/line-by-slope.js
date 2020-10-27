import Line from './line';

class LineBySlope extends Line {
  constructor({
    point,
    slope,
    length = 100,
  }) {
    const theta = Math.atan(slope);
    const startPoint = point.clone().translatePolar({ radius: length, theta });
    const endPoint = point.clone().translatePolar({ radius: length, theta: theta + Math.PI });

    super({ startPoint, endPoint });
  }
}

export default LineBySlope;
