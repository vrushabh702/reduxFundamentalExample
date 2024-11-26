export const print1 = (storeApi) => (next) => (action) => {
  console.log("1");
  return next(action);
};

export const print2 = (storeApi) => (next) => (action) => {
  console.log("2");
  return next(action);
};

export const print3 = (storeApi) => (next) => (action) => {
  console.log("3");
  return next(action);
};
