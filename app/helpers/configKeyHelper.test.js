import { maskConfigKey, getConfigKeyValue } from './configKeyHelper';

describe('maskConfigKey', () => {
  test.each`
    key                     | expected
    ${'valid-key'}          | ${false}
    ${'another-valid-key'}  | ${false}
    ${'cookiesecret'}       | ${true}
    ${'cookieSecret'}       | ${true}
    ${'redisPass'}          | ${true}

`('should return "$expected" when key is "$key"', ({ key, expected }) => {
    const result = maskConfigKey(key);
    expect(result).toBe(expected);
  });
});

describe('getConfigKeyValue', () => {
  test.each`
  key                     | value         | expected
  ${'valid-key'}          | ${'abc'}      | ${'abc'}
  ${'another-valid-key'}  | ${'def'}      | ${'def'}
  ${'cookieSECRET'}       | ${'abc'}      | ${'****'}
  ${'cookieSecret'}       | ${'abc'}      | ${'****'}
  ${'redisPass'}          | ${'def'}      | ${'****'}

`('should return "$expected" when key is "$key" and value is "$value"', ({ key, value, expected }) => {
    const result = getConfigKeyValue(key, value);
    expect(result).toBe(expected);
  });
});
