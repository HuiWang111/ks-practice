import http from 'http';
import type { ListenOptions } from 'net';
import type { Middleware } from './interface';
import { Request } from './request';
import { Response } from './response';
import { Context } from './context';
import { compose } from './compose';

export class Koa {
  private _middlewares: Set<Middleware>;

  constructor() {
    this._middlewares = new Set();
  }

  use(middleware: Middleware): this {
    if (typeof middleware === 'function') {
      this._middlewares.add(middleware);
    }
        
    return this;
  }

  listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): this;
  listen(port?: number, hostname?: string, listeningListener?: () => void): this;
  listen(port?: number, backlog?: number, listeningListener?: () => void): this;
  listen(port?: number, listeningListener?: () => void): this;
  listen(path: string, backlog?: number, listeningListener?: () => void): this;
  listen(path: string, listeningListener?: () => void): this;
  listen(options: ListenOptions, listeningListener?: () => void): this;
  listen(handle: any, backlog?: number, listeningListener?: () => void): this;
  listen(handle: any, listeningListener?: () => void): this;
  listen(...args: any[]): this {
    http.createServer((req, res) => {
      const request = new Request(req);
      const response = new Response(res);
      const ctx = new Context(request, response, req, res);
      const fn = compose([...this._middlewares]);

      fn(ctx);
    })
      .listen(...args);

    return this;
  }
}
