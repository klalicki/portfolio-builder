export const getRandomString = () => {
  return (Math.floor(Math.random() * 200) + Date.now()).toString();
};
