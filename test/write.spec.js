import ava from 'ava-spec';
import dot from '../source/strategies/dot-default';
import write from '../source/write';

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

ava('write', t => {
  write(data, 'hello.from.nested.number', 12, v => v);
  t.is(data.hello.from.nested.number, 12);

  write(data, 'hello.from.nested.string', 'AB', v => v);
  t.is(data.hello.from.nested.string, 'AB');

  write(data, 'hello.from.nested.info[10].spec', 'Info', dot);
  t.is(data.hello.from.nested.info.length, 11);
  t.is(data.hello.from.nested.info[10].spec, 'Info');
});
