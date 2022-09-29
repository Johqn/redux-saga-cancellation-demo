export const waitFor = (value) => (ms) =>
  new Promise((res) => setTimeout(() => res(value), ms));

export const wait = waitFor();
