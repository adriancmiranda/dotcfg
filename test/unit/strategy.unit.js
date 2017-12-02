import * as strategies from '../../source/strategies/index.js';

describe('#strategies', () => {
  it('strategies should be a Object', () => {
    expect(strategies).toEqual(jasmine.any(Object));
  });

  it('strategies.dotDefault should be a Function', () => {
    expect(strategies.dotDefault).toEqual(jasmine.any(Function));
  });

  it('strategies.assignDefault should be a Function', () => {
    expect(strategies.assignDefault).toEqual(jasmine.any(Function));
  });
});
