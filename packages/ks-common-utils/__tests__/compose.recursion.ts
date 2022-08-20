import type {
  Dispatch,
  Middleware
} from '../src/compose/recursion';
import {
  compose
} from '../src/compose/recursion';

describe('test compose', () => {
  it('compose shoud work', async () => {
    const middlewares: Middleware[] = [];
    const numbers: number[] = [];

    middlewares.push(async (ctx: any, next: Dispatch) => {
      numbers.push(1);
      await next();
      numbers.push(6);
    });

    middlewares.push(async (ctx: any, next: Dispatch) => {
      numbers.push(2);
      await next();
      numbers.push(5);
    });

    middlewares.push(async (ctx: any, next: Dispatch) => {
      numbers.push(3);
      await next();
      numbers.push(4);
    });

    await compose(middlewares)({});
    expect(numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
})
