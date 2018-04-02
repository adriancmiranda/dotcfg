import normalize from '../../source/core/normalize.js';

describe('#normalize', () => {
  it('normalize should be a Function', () => {
    expect(normalize).toEqual(jasmine.any(Function));
  });
});
