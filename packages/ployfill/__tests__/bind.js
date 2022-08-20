import { bind } from '..';

describe('test bind', () => {
  it('should work', () => {
    const foo = {
      value: 1
    };
    function bar() { /** pass */ }
    const Bound = bind(bar, foo);
    const NativeBound = bar.bind(foo);
    const bound = new Bound();
    const nativeBound = new NativeBound();

    expect(bound).toEqual(nativeBound);
  });

  it('bind constructor function', () => {
    const foo = {
      value: 1
    };
    function bar(name, age) {
      this.habit = 'shopping';
      this.name = name;
      this.age = age;
    }
    bar.prototype.friend = 'kevin';
    const Bound = bind(bar, foo, 'kennys');
    const NativeBound = bar.bind(foo, 'kennys');
    const bound = new Bound(18);
    const nativeBound = new NativeBound(18);

    expect(bound.value).toBe(nativeBound.value);
    expect(bound.habit).toBe(nativeBound.habit);
    expect(bound.name).toBe(nativeBound.name);
    expect(bound.age).toBe(nativeBound.age);
    expect(bound.friend).toBe(nativeBound.friend);
  });
});