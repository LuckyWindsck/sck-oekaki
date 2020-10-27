const cartesian2polar = ({ x, y }) => ({
  radius: Math.hypot(x, y),
  theta: Math.atan2(y, x),
});

const polar2cartesian = ({ radius, theta }) => ({
  x: radius * Math.cos(theta),
  y: radius * Math.sin(theta),
});

export default {
  cartesian2polar,
  polar2cartesian,
};
