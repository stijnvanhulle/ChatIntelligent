export const getPanning = (bounds, x) => {

  const range = bounds.width - (bounds.border * 2);
  const halfRange = range / 2;

  x = x - bounds.border;

  let panning = x / range;

  if (panning < 0.5) {
    panning = - (1 - (x / halfRange));
  } else if (panning === 0.5) {
    panning = 0;
  } else {
    panning = (x - halfRange) / halfRange;
  }

  return panning;

};

export const randomType = () => {
  const types = [`sine`, `sawtooth`, `triangle`, `square`];
  return types[Math.floor(Math.random() * types.length)];
};

export const getVolume = (bounds, y) => {

  const range = bounds.height - (bounds.border * 2);
  y = y - bounds.border;

  return 1 - (y / range);

};

export default {
  getPanning,
  randomType,
  getVolume
};
