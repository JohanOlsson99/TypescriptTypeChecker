'use strict'
import { Checker, Types } from '../src/Checker';
 
describe('Testing checkVariableType', () => {
  test('empty string should result in zero', () => {
    expect(0).toBe(0);
  });
  test('checker should be string', () => {
    const checker = new Checker();
    expect(checker.checkVariableType('', Types.STRING)).toBe(true);
    expect(checker.checkVariableType('Hello world', Types.STRING)).toBe(true);
    expect(checker.checkVariableType(1, Types.STRING)).toBe(false);
    expect(checker.checkVariableType({}, Types.STRING)).toBe(false);
    try {
      checker.checkVariableType(false, Types.STRING, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be number', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(1, Types.NUMBER)).toBe(true);
    expect(checker.checkVariableType(1.1, Types.NUMBER)).toBe(true);
    expect(checker.checkVariableType('1', Types.NUMBER)).toBe(false);
    expect(checker.checkVariableType({}, Types.NUMBER)).toBe(false);
    try {
      checker.checkVariableType('2', Types.NUMBER, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be boolean', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(true, Types.BOOLEAN)).toBe(true);
    expect(checker.checkVariableType(false, Types.BOOLEAN)).toBe(true);
    expect(checker.checkVariableType(1, Types.BOOLEAN)).toBe(false);
    expect(checker.checkVariableType('', Types.BOOLEAN)).toBe(false);
    expect(checker.checkVariableType({}, Types.BOOLEAN)).toBe(false);
    try {
      checker.checkVariableType(1, Types.BOOLEAN, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be object', () => {
    const checker = new Checker();
    expect(checker.checkVariableType({}, Types.OBJECT)).toBe(true);
    expect(checker.checkVariableType({a: 2, b: '1'}, Types.OBJECT)).toBe(true);
    expect(checker.checkVariableType([], Types.OBJECT)).toBe(false);
    expect(checker.checkVariableType(1, Types.OBJECT)).toBe(false);
    expect(checker.checkVariableType('', Types.OBJECT)).toBe(false);
    expect(checker.checkVariableType(true, Types.OBJECT)).toBe(false);
    try {
      checker.checkVariableType(1, Types.OBJECT, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be array', () => {
    const checker = new Checker();
    expect(checker.checkVariableType([], Types.ARRAY)).toBe(true);
    expect(checker.checkVariableType([1, 2, 3], Types.ARRAY)).toBe(true);
    expect(checker.checkVariableType({}, Types.ARRAY)).toBe(false);
    expect(checker.checkVariableType(1, Types.ARRAY)).toBe(false);
    expect(checker.checkVariableType('', Types.ARRAY)).toBe(false);
    expect(checker.checkVariableType(true, Types.ARRAY)).toBe(false);
    try {
      checker.checkVariableType(1, Types.ARRAY, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be function', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(() => {}, Types.FUNCTION)).toBe(true);
    expect(checker.checkVariableType(() => { console.log('2'); }, Types.FUNCTION)).toBe(true);
    expect(checker.checkVariableType(1, Types.FUNCTION)).toBe(false);
    expect(checker.checkVariableType('', Types.FUNCTION)).toBe(false);
    expect(checker.checkVariableType(true, Types.FUNCTION)).toBe(false);
    expect(checker.checkVariableType({}, Types.FUNCTION)).toBe(false);
    expect(checker.checkVariableType([], Types.FUNCTION)).toBe(false);
    try {
      checker.checkVariableType(1, Types.FUNCTION, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be undefined', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(undefined, Types.UNDEFINED)).toBe(true);
    expect(checker.checkVariableType(null, Types.UNDEFINED)).toBe(false);
    expect(checker.checkVariableType(1, Types.UNDEFINED)).toBe(false);
    expect(checker.checkVariableType('', Types.UNDEFINED)).toBe(false);
    expect(checker.checkVariableType(true, Types.UNDEFINED)).toBe(false);
    expect(checker.checkVariableType({}, Types.UNDEFINED)).toBe(false);
    expect(checker.checkVariableType([], Types.UNDEFINED)).toBe(false);
    try {
      checker.checkVariableType(1, Types.UNDEFINED, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be null', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(null, Types.NULL)).toBe(true);
    expect(checker.checkVariableType(undefined, Types.NULL)).toBe(false);
    expect(checker.checkVariableType(1, Types.NULL)).toBe(false);
    expect(checker.checkVariableType('', Types.NULL)).toBe(false);
    expect(checker.checkVariableType(true, Types.NULL)).toBe(false);
    expect(checker.checkVariableType({}, Types.NULL)).toBe(false);
    expect(checker.checkVariableType([], Types.NULL)).toBe(false);
    try {
      checker.checkVariableType(1, Types.NULL, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be regexp', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(/^[a-z]+$/, Types.REGEXP)).toBe(true);
    expect(checker.checkVariableType(/^[a-z]+$/, Types.REGEXP, new Error('Custom Error'))).toBe(true);
    expect(checker.checkVariableType(new RegExp('[a-z]'), Types.REGEXP)).toBe(true);
    expect(checker.checkVariableType(1, Types.REGEXP)).toBe(false);
    expect(checker.checkVariableType('', Types.REGEXP)).toBe(false);
    expect(checker.checkVariableType(true, Types.REGEXP)).toBe(false);
    expect(checker.checkVariableType({}, Types.REGEXP)).toBe(false);
    expect(checker.checkVariableType([], Types.REGEXP)).toBe(false);
    try {
      checker.checkVariableType(1, Types.REGEXP, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be date', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(new Date(), Types.DATE)).toBe(true);
    expect(checker.checkVariableType(new Date(), Types.DATE, new Error('Custom Error'))).toBe(true);
    expect(checker.checkVariableType(1, Types.DATE)).toBe(false);
    expect(checker.checkVariableType('', Types.DATE)).toBe(false);
    expect(checker.checkVariableType(true, Types.DATE)).toBe(false);
    expect(checker.checkVariableType({}, Types.DATE)).toBe(false);
    expect(checker.checkVariableType([], Types.DATE)).toBe(false);
    try {
      checker.checkVariableType(1, Types.DATE, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });
  test('checker should be error', () => {
    const checker = new Checker();
    expect(checker.checkVariableType(new Error(), Types.ERROR)).toBe(true);
    expect(checker.checkVariableType(new Error(), Types.ERROR, new Error('Custom Error'))).toBe(true);
    expect(checker.checkVariableType(1, Types.ERROR)).toBe(false);
    expect(checker.checkVariableType('', Types.ERROR)).toBe(false);
    expect(checker.checkVariableType(true, Types.ERROR)).toBe(false);
    expect(checker.checkVariableType({}, Types.ERROR)).toBe(false);
    expect(checker.checkVariableType([], Types.ERROR)).toBe(false);
    try {
      checker.checkVariableType(1, Types.ERROR, new Error('Custom Error'));
      throw new Error('Did not pass');
    } catch (e: any) {
      expect(e.message).toBe('Custom Error');
    }
  });

  describe('Testing checkNumber', () => {
    test('checkNumber should be number', () => {
      const checker = new Checker();
      expect(checker.checkNumber(1)).toBe(true);
      expect(checker.checkNumber(1, new Error('Custom Error'))).toBe(true);
      expect(checker.checkNumber('10', new Error('Custom Error'))).toBe(true);
      expect(checker.checkNumber(true)).toBe(false);
      expect(checker.checkNumber({})).toBe(false);
      expect(checker.checkNumber([])).toBe(false);
      try {
        checker.checkNumber(true, new Error('Custom Error'));
        throw new Error('Did not pass');
      } catch (e: any) {
        expect(e.message).toBe('Custom Error');
      }
    });
    test('checkNumber with parameters', () => {
      const checker = new Checker();
      expect(checker.checkNumber(10, undefined, { min: 10, max: 20 })).toBe(true);
      expect(checker.checkNumber(10, undefined, { min: 11, max: 20 })).toBe(false);
      expect(checker.checkNumber(10, undefined, { min: 5, max: 10 })).toBe(true);
      expect(checker.checkNumber(10, undefined, { min: 5, max: 9 })).toBe(false);
      expect(checker.checkNumber(10, undefined, { equalTo: [1, 4, 8, 9, 11] })).toBe(false);
      expect(checker.checkNumber(10, undefined, { equalTo: [1, 4, 8, 10, 11] })).toBe(true);
      expect(checker.checkNumber(10, undefined, { notEqualTo: [1, 4, 8, 10, 11] })).toBe(false);
      expect(checker.checkNumber(10, undefined, { notEqualTo: [1, 4, 8, 9, 11] })).toBe(true);
      expect(checker.checkNumber(10, undefined, { equalTo: [10], notEqualTo: [9, 10, 11] })).toBe(false);
      expect(checker.checkNumber(10, undefined, { equalTo: [10], notEqualTo: [9, 11], min: 11 })).toBe(false);
      expect(checker.checkNumber(10, undefined, { equalTo: [10], notEqualTo: [9, 11], min: 6, max: 9 })).toBe(false);
      expect(checker.checkNumber(10, undefined, { equalTo: [10], notEqualTo: [9, 11], min: 6, max: 12 })).toBe(true);
    })
  });
});