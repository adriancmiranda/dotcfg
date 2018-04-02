import read from '../../source/core/read.js';

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

describe('#read', () => {
  it('read should be a Function', () => {
    expect(read).toEqual(jasmine.any(Function));
  });

  it('read', () => {
    expect(read(data, 'name')).toEqual('Unit test');
    expect(read(data, 'list[0]')).toEqual('test_1');
    expect(read(data.list, '[0]')).toEqual('test_1');
    expect(read(data, 'hello.from.nested.object')).toEqual('This is the object property');
    expect(read(data, 'hello.from.nested.list[0].value')).toEqual('It works!');
    expect(read(data, 'hello.from.nested.list[1].value')).toEqual('It works too!');
    expect(read(data, 'hello.from.nested.list[2].value')).toEqual(undefined);
    expect(read(data, 'another.non.existent.property')).toEqual(undefined);
  });
});
