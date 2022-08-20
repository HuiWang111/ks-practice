import type { Context } from './context';

export type Dispatch = () => (index: number) => Promise<Middleware>;

export type Middleware = (ctx: any, next: Dispatch) => Promise<void>;

export type RouterCallback = (ctx: Context) => Promise<void>;
