import Line from './line';
import Coordinate from '../../../math/coordinate';

const { polar2cartesian } = Coordinate;

class LineBySlope extends Line {
  constructor(point, slope, length = 100, p5) {
    const theta = Math.atan(slope);
    const auxiliaryPoint1 = point.clone().translate(...polar2cartesian(length, theta));
    const auxiliaryPoint2 = point.clone().translate(...polar2cartesian(length, theta + Math.PI));

    super(auxiliaryPoint1, auxiliaryPoint2, p5);
  }
}

export default LineBySlope;
