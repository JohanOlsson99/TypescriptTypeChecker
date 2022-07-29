'use strict'
import { Checker, Types } from '../src/index';
 
describe('testing index file', () => {
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

  /*
  console.log('1');
console.log(new Checker().checkVariableType("2", Types.STRING));
console.log('2');
console.log(new Checker().checkVariableType(1, Types.NUMBER));
console.log('3');
console.log(new Checker().checkVariableType(true, Types.BOOLEAN));
console.log('4');
console.log(new Checker().checkVariableType({}, Types.OBJECT));
console.log('5');
console.log(new Checker().checkVariableType([1], Types.ARRAY));
console.log('6');
console.log(new Checker().checkVariableType(function () { }, Types.FUNCTION));
console.log('7');
console.log(new Checker().checkVariableType(undefined, Types.UNDEFINED));
console.log('8');
console.log(new Checker().checkVariableType(null, Types.NULL));
console.log('9');
console.log(new Checker().checkVariableType(Symbol(), Types.SYMBOL));
console.log('10');
console.log(new Checker().checkVariableType(/a/, Types.REGEXP));
console.log('11');
console.log(new Checker().checkVariableType(new Date(), Types.DATE));
console.log('12');
console.log(new Checker().checkVariableType(new Error(), Types.ERROR));
console.log('13');
console.log(new Checker().checkVariableType(JSON.stringify({a: 1}), Types.JSON));
  */
});