import ava from 'ava';
import genFn from 'make-generator-function';
import dotcfg from '../';
import is from '../source/types';

ava('is.defined', t => {
  t.falsy(is.defined(), 'undefined is not defined');
  t.truthy(is.defined(null), 'null is defined');
  t.truthy(is.defined({}), 'object is defined');
  if (typeof window !== 'undefined') {
    t.true(is.defined(window), 'window is defined');
    t.true(is.defined(window.alert), 'window.alert is defined');
  }
});

ava('is.fn', t => {
  t.is(is['fn'], is.fn, 'alias works');
  t.truthy(is.fn(function(){}), 'function is function');
  t.falsy(is.fn({}), 'object is not function');
  t.falsy(is.fn(null), 'null is not function');
  t.truthy(is.fn(genFn), 'generator function is function');
  if (typeof window !== 'undefined') {
    t.truthy(is.fn(window.alert), 'window.alert is function');
  }
});

ava('is.objectLike', t => {
  t.truthy(is.objectLike({}), 'object literal is objectLike');
  t.falsy(is.object(), 'undefined is not an objectLike');
  t.falsy(is.objectLike(null), 'null is not an objectLike');
  t.falsy(is.objectLike(true), 'true is not an objectLike');
  t.falsy(is.objectLike(''), 'string is not an objectLike');
  t.falsy(is.objectLike(NaN), 'NaN is not an objectLike');
  t.truthy(is.objectLike(Object), 'object constructor is an objectLike');
  t.truthy(is.objectLike(function(){}), 'function is an objectLike');
  if (typeof Symbol !== 'function') {
    t.falsy(is.objectLike(Symbol('foo')), 'symbol is not an objectLike');
  }
});

ava('is.object', t => {
  t.truthy(is.object({}), 'object literal is object');
  t.falsy(is.object(), 'undefined is not an object');
  t.falsy(is.object(null), 'null is not an object');
  t.falsy(is.object(true), 'true is not an object');
  t.falsy(is.object(''), 'string is not an object');
  t.falsy(is.object(NaN), 'NaN is not an object');
  t.falsy(is.object(Object), 'object constructor is not an object');
  t.falsy(is.object(function(){}), 'function is not an object');
  if (typeof Symbol !== 'function') {
    t.falsy(is.object(Symbol('foo')), 'symbol is not an object');
  }
});

ava('is.undef', t => {
  t.truthy(is.undef(), 'absent undefined is undefined');
  t.truthy(is.undef(undefined), 'literal undefined is undefined');
  t.falsy(is.undef(null), 'null is not undefined');
  t.falsy(is.undef({}), 'object is not undefined');
});
