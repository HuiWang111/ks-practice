import type { Dispatch, Middleware, RouterCallback } from './interface';
import type { Context } from './context';

export class Router {
  private _methods: string[];
  private _callbacks: Map<string, RouterCallback[]>;

  constructor() {
    this._methods = [
      'GET',
      'PUT',
      'PATCH',
      'POST',
      'DELETE'
    ];

    this._callbacks = new Map();
  }

  public async get(path: string, callback: RouterCallback): Promise<void> {
    const key = `GET ${path}`;
    let callbacks: RouterCallback[] | undefined = this._callbacks.get(key);

    if (!callbacks) {
      callbacks = [];
    }

    callbacks.push(callback);
    this._callbacks.set(key, callbacks);
  }

  public async post(path: string, callback: RouterCallback): Promise<void> {
    const key = `POST ${path}`;
    let callbacks: RouterCallback[] | undefined = this._callbacks.get(key);

    if (!callbacks) {
      callbacks = [];
    }

    callbacks.push(callback);
    this._callbacks.set(key, callbacks);
  }

  public async patch(path: string, callback: RouterCallback): Promise<void> {
    const key = `PATCH ${path}`;
    let callbacks: RouterCallback[] | undefined = this._callbacks.get(key);

    if (!callbacks) {
      callbacks = [];
    }

    callbacks.push(callback);
    this._callbacks.set(key, callbacks);
  }

  public async put(path: string, callback: RouterCallback): Promise<void> {
    const key = `PUT ${path}`;
    let callbacks: RouterCallback[] | undefined = this._callbacks.get(key);

    if (!callbacks) {
      callbacks = [];
    }

    callbacks.push(callback);
    this._callbacks.set(key, callbacks);
  }

  public async delete(path: string, callback: RouterCallback): Promise<void> {
    const key = `DELETE ${path}`;
    let callbacks: RouterCallback[] | undefined = this._callbacks.get(key);

    if (!callbacks) {
      callbacks = [];
    }

    callbacks.push(callback);
    this._callbacks.set(key, callbacks);
  }

  public routes(): Middleware {
    return async (ctx: Context, next: Dispatch): Promise<void> => {
      const { path, method } = ctx.request;

      const key = `${method} ${path}`;
      const callbacks = this._callbacks.get(key);

      if (!callbacks) {
        ctx.response.status = 404;
        ctx.body = 'Not Found';
        return;
      }

      callbacks.forEach(cb => cb(ctx));

      await next();
    }
  }
}