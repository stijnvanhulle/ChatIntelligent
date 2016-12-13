'use strict';

const randomBool = () => {
  return Boolean(Math.round(Math.random()));
};

const randomBetween = (min, max, round = true, signed = false) => {

  let rand = min + Math.random() * (max - min);
  if (rand) rand = Math.round(rand);

  if (signed && randomBool()) {
    return rand - (rand * 2);
  }
  return rand;
};

export const randomPoint = (bounds = {}) => {

  bounds.border = bounds.border || 0;

  return {
    x: randomBetween(bounds.border, bounds.width / 2 - bounds.border, true, true),
    y: randomBetween(bounds.border, bounds.height / 2 - bounds.border, true, true),
    z: randomBetween(bounds.border, bounds.depth / 2 - bounds.border, true, true)
  };

};

export const distanceBetweenPoints = (pos1, pos2) => {

  let xs = pos2.x - pos1.x;
  xs = xs * xs;

  let ys = pos2.y - pos1.y;
  ys = ys * ys;

  let zs = pos2.z - pos1.z;
  zs = zs * zs;

  return Math.sqrt(xs + ys + zs);

};

export default {
  randomBetween,
  distanceBetweenPoints,
  randomPoint
};
