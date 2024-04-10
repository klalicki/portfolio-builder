export const formatCssRules = (obj: { [key: string]: string }) => {
  const returnObj: { [key: string]: string } = {};
  Object.entries(obj).forEach((entry) => {
    returnObj["--" + entry[0]] = entry[1];
  });
  return returnObj;
};
