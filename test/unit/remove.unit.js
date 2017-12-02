import remove from '../../source/core/remove.js';

describe('#remove', () => {
  it('remove should be a Function', () => {
    expect(remove).toEqual(jasmine.any(Function));
  });
});
