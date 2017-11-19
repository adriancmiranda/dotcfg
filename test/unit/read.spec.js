import ava from 'ava-spec';
import read from '../../source/read';

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

ava('read', t => {
  t.is(read(data, 'name'), 'Unit test');
  t.is(read(data, 'list[0]'), 'test_1');
  t.is(read(data, 'hello.from.nested.object'), 'This is the object property');
  t.is(read(data, 'hello.from.nested.list[0].value'), 'It works!');
  t.is(read(data, 'hello.from.nested.list[1].value'), 'It works too!');
  t.is(read(data, 'hello.from.nested.list[2].value'), undefined);
  t.is(read(data, 'another.non.existent.property'), undefined);
});
