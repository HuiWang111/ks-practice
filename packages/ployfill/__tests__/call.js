import { call } from '..';

describe('test call', () => {
  it('should work', () => {
    function Product(name, price) {
      this.name = name;
      this.price = price;
    }

    function Food(name, price) {
      call(Product, this, name, price);
      this.category = 'food';
    }

    function Toy(name, price) {
      call(Product, this, name, price);
      this.category = 'toy';
    }

    const cheese = new Food('feta', 5);
    const fun = new Toy('robot', 40);

    expect(cheese.name).toBe('feta');
    expect(cheese.price).toBe(5);
    expect(cheese.category).toBe('food');
    expect(fun.name).toBe('robot');
    expect(fun.price).toBe(40);
    expect(fun.category).toBe('toy');
  });
});