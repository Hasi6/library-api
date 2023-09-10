import { isNumber } from '../../src/utils/isNumber';
/* eslint-disable no-undef */

describe('isNumber Utils', () => {
  it('Its a number', () => {
    [0, 1, 2, -1, 1.345e17, '1'].forEach((n) => {
      expect(isNumber(n)).toEqual(true);
    });
  });

  it('Its not a number', () => {
    [false, true, NaN, [], {}, '1a'].forEach((n) => {
      expect(isNumber(n)).toEqual(false);
    });
  });
});
