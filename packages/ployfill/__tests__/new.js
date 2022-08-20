import { objectFactory } from '..';

describe('test objectFactory', () => {
  it('should work', () => {
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    const person = objectFactory(Person, 'kennys', 28);

    expect(person.name).toBe('kennys');
    expect(person.age).toBe(28);
    expect(person instanceof Person).toBe(true);
  });

  it('return object should work', () => {
    function Person(name, age) {
      return {
        name,
        age
      }
    }

    const person = objectFactory(Person, 'kennys', 28);

    expect(person.name).toBe('kennys');
    expect(person.age).toBe(28);
    expect(person instanceof Person).toBe(false);
  });
});