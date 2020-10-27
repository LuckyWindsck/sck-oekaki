import TwoDPrimitive from './2d-primitive';

class Line extends TwoDPrimitive {
  #startPoint;

  #endPoint;

  #radius = 0;

  #theta = 0;

  constructor({ startPoint, endPoint }) {
    super();

    this.#startPoint = startPoint;
    this.#endPoint = endPoint;
    this.#radius = this.#endPoint.distance(this.#startPoint);
    this.#theta = Math.atan2(this.delta.y, this.delta.x);
  }

  get startPoint() {
    return this.#startPoint;
  }

  set startPoint(point) {
    this.#startPoint = point;
    this.#radius = this.endPoint.distance(point);
    this.#theta = Math.atan2(this.delta.y, this.delta.x);
  }

  get endPoint() {
    return this.#endPoint;
  }

  set endPoint(point) {
    this.#endPoint = point;
    this.#radius = this.startPoint.distance(point);
    this.#theta = Math.atan2(this.delta.y, this.delta.x);
  }

  get radius() {
    return this.#radius;
  }

  set radius(radius) {
    this.#radius = radius;
    this.#endPoint = this.startPoint.clone().translatePolar({
      radius,
      theta: this.theta,
    });
  }

  get theta() {
    return this.#theta;
  }

  set theta(theta) {
    this.#theta = theta;
    this.#endPoint = this.startPoint.clone().translatePolar({
      radius: this.radius,
      theta,
    });
  }

  get delta() {
    return {
      x: this.#endPoint.x - this.#startPoint.x,
      y: this.#endPoint.y - this.#startPoint.y,
    };
  }

  get slope() {
    return Math.tan(this.#theta);
  }

  get intercept() {
    return {
      x: this.#startPoint.x - this.#startPoint.y / this.slope,
      y: this.#startPoint.y - this.slope * this.#startPoint.x,
    };
  }

  get orthogonalSlope() {
    return Math.tan(this.#theta + Math.PI / 2);
  }

  _show(p5) {
    p5.line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
  }
}

Line.BySlope = ({
  point,
  slope,
  length = 100,
}) => {
  const theta = Math.atan(slope);
  const startPoint = point.clone().translatePolar({ radius: length, theta });
  const endPoint = point.clone().translatePolar({ radius: length, theta: theta + Math.PI });

  return new Line({ startPoint, endPoint });
};

export default Line;
