const cartesian2polar = (x, y) => [
  Math.hypot(x, y),
  Math.atan(y / x),
];

const polar2cartesian = (radius, theta) => [
  radius * Math.cos(theta),
  radius * Math.sin(theta),
];

export default {
  cartesian2polar,
  polar2cartesian,
};
