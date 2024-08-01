export const getIosVersion = () => {
  const match = navigator.userAgent.match(/OS (\d+)_/);
  const version = match ? match[1] : 'unknown';
  console.log(version);
  return version;
};
