export const maskConfigKey = (key) => {
  const forbiddenKeys = [
    'cookieSecret',
    'redisPass',
  ];

  const keyLowerCase = key.toLocaleLowerCase();
  const result = forbiddenKeys.filter((word) => word.toLocaleLowerCase() === keyLowerCase);

  return result.length > 0;
};

export const getConfigKeyValue = (key, value) => {
  const maskValue = '****';
  const found = maskConfigKey(key);

  return found ? maskValue : value;
};
