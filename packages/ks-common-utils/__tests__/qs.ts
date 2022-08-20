import qs from '../src/qs';

describe('test qs', () => {
  it('qs.parse should work', () => {
    expect(qs.parse("a=b&c=1")).toEqual({
      a: 'b',
      c: '1'
    });
    expect(qs.parse('x&a=1&b=2&arr[0][2][4]=1&arr[1]=2&arr[2]=3&person.name=xss')).toEqual({
      x: undefined,
      a: '1',
      b: '2',
      arr: [[ undefined, undefined, [undefined, undefined, undefined, undefined, '1']], '2', '3'],
      person: {
        name: 'xss'
      }
    });
    expect(qs.parse('x=1&y=%E5%93%88%E5%93%88')).toEqual({
      x: '1',
      y: '哈哈'
    });
  });
});