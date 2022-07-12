export const createWorker = (workerUrl) => {
  var worker = new Worker(`${window.location.href}${workerUrl}`);

  return worker;
};
