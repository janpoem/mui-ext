import { assert as _ } from 'chai';
import {
  ceil10,
  filterNumeric,
  filterNumericWithMax,
  filterNumericWithMin,
  filterNumericWithMinMax, floor10,
  isNumeric, random, round10,
} from './numeric';

describe('numeric', function () {
  it('isNumeric', function () {
    _.equal(isNumeric('ab'), false);
    _.equal(isNumeric('12'), true);
    _.equal(isNumeric('0.54'), true);
    _.equal(isNumeric(0b101), true);
    _.equal(isNumeric(true), false);
    _.equal(isNumeric(false), false);
    _.equal(isNumeric(null), false);
    _.equal(isNumeric(undefined), false);
    _.equal(isNumeric(['abc']), false);
    _.equal(isNumeric([34]), false);
    _.equal(isNumeric({ 12: 34 }), false);
  });

  it('filterNumeric', function () {
    _.equal(filterNumeric('13', 0), 13);
    _.equal(filterNumeric('ab', 0), 0);
    _.equal(filterNumeric('  ', 0), 0);
    _.equal(filterNumeric(true), 1);
    _.equal(filterNumeric(false), 0);
    _.equal(filterNumeric(null), 0);
  });

  it('filterNumericWithMin', function () {
    _.equal(filterNumericWithMin('ab', 10, 0), 10);
    _.equal(filterNumericWithMin('13', 10, 0), 13);
    _.equal(filterNumericWithMin(5, 0, 0), 5);
    _.equal(filterNumericWithMin(-5, 0, 0), 0);
  });

  it('filterNumericWithMax', function () {
    _.equal(filterNumericWithMax('ab', 10, 0), 0);
    _.equal(filterNumericWithMax('13', 10, 0), 10);
    _.equal(filterNumericWithMax(25, 99, 0), 25);
    _.equal(filterNumericWithMax(25.5, 25, 0), 25);
    _.equal(filterNumericWithMax(25, 25.5, 0), 25);
  });

  it('filterNumericWithMinMax', function () {
    _.equal(filterNumericWithMinMax('ab', 0, 5), 0);
    _.equal(filterNumericWithMinMax(15, 0, 5), 5);
    _.equal(filterNumericWithMinMax(-5, 0, 5), 0);
  });

  it('random', function () {
    const times = 30;
    [
      [0, 100],
      [100, 999],
    ].forEach(([min, max]) => {
      new Array(times).forEach(() => {
        const r = random(min, max);
        _.equal(r > min, true);
        _.equal(r < max, true);
      });
    });
  });

  describe('decimalAdjust', function () {
    it('round10', function () {
      const method = round10;
      _.equal(method(10.5, 0), 11);
      _.equal(method(10.457, 0), 10);
      _.equal(method(10.457, -1), 10.5);
      _.equal(method(10.457, -2), 10.46);
      _.equal(method(10.004, -2), 10);
      _.equal(method(10.005, -2), 10.01);
      _.equal(method(15, 1), 20);
      _.equal(method(50.00001, 2), 100);
      _.equal(method(49.999, 2), 0);
      _.equal(method(320, 2), 300);
      _.equal(method(982, 1), 980);
    });


    it('floor10', function () {
      const method = floor10;
      _.equal(method(10.5, 0), 10);
      _.equal(method(10.457, 0), 10);
      _.equal(method(10.457, -1), 10.4);
      _.equal(method(10.457, -2), 10.45);
      _.equal(method(10.004, -2), 10);
      _.equal(method(10.005, -2), 10);
      _.equal(method(15, 1), 10);
      _.equal(method(50.00001, 2), 0);
      _.equal(method(49.999, 2), 0);
      _.equal(method(320, 2), 300);
      _.equal(method(982, 1), 980);
    });

    it('ceil10', function () {
      const method = ceil10;
      _.equal(method(10.5, 0), 11);
      _.equal(method(10.457, 0), 11);
      _.equal(method(10.457, -1), 10.5);
      _.equal(method(10.457, -2), 10.46);
      _.equal(method(10.004, -2), 10.01);
      _.equal(method(10.005, -2), 10.01);
      _.equal(method(15, 1), 20);
      _.equal(method(50.00001, 2), 100);
      _.equal(method(49.999, 2), 100);
      _.equal(method(320, 2), 400);
      _.equal(method(982, 1), 990);
    });
  });
});
