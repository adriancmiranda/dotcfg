/* globals window, document, HTMLElement */

import ava from 'ava-spec';
import genFn from 'make-generator-function';
import is from '../source/is';

ava('is.fn', t => {
  t.truthy(is.fn(function(){}), 'function is function');
  t.falsy(is.fn({}), 'object is not function');
  t.falsy(is.fn(null), 'null is not function');
  t.falsy(is.fn(2), 'number is not function');
  t.falsy(is.fn(''), 'string is not function');
  t.falsy(is.fn(/test/), 'regexp is not function');
  t.truthy(is.fn(genFn), 'generator function is function');
  if (typeof window !== 'undefined') {
    t.truthy(is.fn(window.alert), 'window.alert is function');
  }
});

ava('is.number', t => {
  t.truthy(is.number(0), 'positive zero is number');
  t.truthy(is.number(0 / -1), 'negative zero is number');
  t.truthy(is.number(3), 'three is number');
  t.truthy(is.number(NaN), 'NaN is number');
  t.truthy(is.number(Infinity), 'infinity is number');
  t.truthy(is.number(-Infinity), 'negative infinity is number');
  t.truthy(is.number(Object(42)), 'object number is number');
  t.falsy(is.number(), 'undefined is not number');
  t.falsy(is.number(null), 'null is not number');
  t.falsy(is.number(true), 'true is not number')
});

ava('is.numeric', t => {
  t.truthy(is.numeric('0'), 'positive zero is number');
});

ava('is.primitive', t => {
  t.falsy(is.primitive({}), 'object literal is not primitive');
  t.truthy(is.primitive(), 'undefined is a primitive');
  t.truthy(is.primitive(null), 'null is a primitive');
  t.truthy(is.primitive(true), 'true is a primitive');
  t.truthy(is.primitive(''), 'string is a primitive');
  t.truthy(is.primitive(NaN), 'NaN is a primitive');
  t.truthy(is.primitive(Infinity), 'Infinity is a primitive');
  t.falsy(is.primitive(Object), 'object constructor is not a primitive');
  t.falsy(is.primitive(function(){}), 'function is not a primitive');
  t.falsy(is.primitive(new Date()), 'new Date() is not a primitive');
  t.falsy(is.primitive(/test/), 'regexp is not a primitive');
  if (typeof Symbol !== 'function') {
    t.falsy(is.primitive(Symbol('foo')), 'symbol is not a primitive');
  }
});

ava('is.object', t => {
  t.is(is['obj'], is.object, 'alias works');
  t.truthy(is.object({}), 'object literal is object');
  t.falsy(is.object(), 'undefined is not an object');
  t.falsy(is.object(null), 'null is not an object');
  t.falsy(is.object(true), 'true is not an object');
  t.falsy(is.object(''), 'string is not an object');
  t.falsy(is.object(NaN), 'NaN is not an object');
  t.falsy(is.object(Infinity), 'Infinity is not an object');
  t.falsy(is.object(Object), 'object constructor is not an object');
  t.falsy(is.object(function(){}), 'function is not an object');
  t.falsy(is.object(new Date()), 'new Date() is not an object');
  t.falsy(is.object(/test/), 'regexp is not an object');
  if (typeof Symbol !== 'function') {
    t.falsy(is.object(Symbol('foo')), 'symbol is not an object');
  }
});

ava('is.string', t => {
  t.is(is['str'], is.string, 'alias works');
  t.truthy(is.string('foo'), 'string literal is string');
  t.truthy(is.string(Object('foo')), 'string object is string');
  t.falsy(is.string(), 'undefined is not string');
  t.falsy(is.string(String), 'string constructor is not string');
  var F = function () {};
  F.prototype = Object('');
  t.falsy(is.string(F), 'string subtype is not string');
});

ava('is.undef', t => {
  t.truthy(is.undef(), 'absent undefined is undefined');
  t.truthy(is.undef(undefined), 'literal undefined is undefined');
  t.falsy(is.undef(null), 'null is not undefined');
  t.falsy(is.undef({}), 'object is not undefined');
  t.falsy(is.undef(NaN), 'NaN is not undefined');
  t.falsy(is.undef(Infinity), 'Infinity is not undefined');
});
