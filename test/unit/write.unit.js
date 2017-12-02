import dot from '../../source/strategies/dot-default.js';
import write from '../../source/core/write.js';

const data = {
  name: 'Unit test',
  list: ['test_1'],
  hello: {
    from: {
      nested: {
        object: 'This is the object property',
        list: [
          {
            value: 'It works!',
          },
          {
            value: 'It works too!',
          },
        ],
      },
    },
  },
};

describe('#exists', () => {
  it('write should be a Function', () => {
    expect(write).toEqual(jasmine.any(Function));
  });

  it('write', () => {
    write(data, 'hello.from.nested.number', 12, dot);
    expect(data.hello.from.nested.number).toBe(12);

    write(data, 'hello.from.nested.string', 'AB', dot);
    expect(data.hello.from.nested.string).toBe('AB');

    write(data, 'hello.from.nested.info[10].spec', 'Info', dot);
    expect(data.hello.from.nested.info.length).toBe(11);
    expect(data.hello.from.nested.info[10].spec).toBe('Info');

    write(data, 'hello.from.1.foo', 'FOO', dot);
    expect(Array.isArray(data.hello.from)).toBe(false);
    expect(data.hello.from['1'].foo).toBe('FOO');
    expect(data.hello.from.length).toBe(undefined);
  });
});
