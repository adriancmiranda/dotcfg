import exists from '../../source/core/exists.js';

describe('#exists', () => {
  it('exists should be a Function', () => {
    expect(exists).toEqual(jasmine.any(Function));
  });
});
