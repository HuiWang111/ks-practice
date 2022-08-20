export type Dispatch = () => Promise<Middleware>;
export type Middleware = (ctx: any, next: Dispatch) => Promise<void>;

/**
 * reduce 版compose
 * TODO: 待完成
 */
export function compose(
  middlewares: Middleware[]
): Promise<Middleware | void> {
  if (middlewares.length === 0) {
    return Promise.resolve();
  } else if (middlewares.length === 1) {
    return Promise.resolve(middlewares[0].call(null, () => Promise.resolve()));
  }

  return Promise.resolve();
}