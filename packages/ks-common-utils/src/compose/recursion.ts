export type Dispatch = () => (index: number) => Promise<Middleware>;

export type Middleware = (ctx: any, next: Dispatch) => Promise<void>;

/**
 * 递归版 compose
 */
export function compose(middlewares: Middleware[]): (ctx: any) => Promise<Middleware | void> {
  return (ctx: any): Promise<Middleware | void> => {
     
    return dispatch(0);

    function dispatch(index: number): Promise<Middleware | void> {
      const fn = middlewares[index];
      if (!fn) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(fn(ctx, dispatch.bind(null, index + 1)))
      } catch (e) {
        return Promise.reject(e);
      }
    }
  }
}