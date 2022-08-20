import type { IncomingHttpHeaders, IncomingMessage } from 'http';
/**
 * 将request对象解析承Url对象
 */
import { format } from 'url';
import parse from 'parseurl';

export class Request {
  private _req: IncomingMessage;

  constructor(req: IncomingMessage) {
    this._req = req;
  }

  public get req(): IncomingMessage {
    return this._req;
  }

  public get headers(): IncomingHttpHeaders {
    return this._req.headers;
  }

  public set headers(val: IncomingHttpHeaders) {
    this._req.headers = val;
  }

  public get url(): string | undefined {
    return this._req.url;
  }

  public set url(val: string | undefined) {
    this._req.url = val;
  }

  public get method(): string | undefined {
    return this._req.method;
  }

  public set method(val: string | undefined) {
    this._req.method = val;
  }

  public get path(): string | null {
    const url = parse(this._req);

    return typeof url?.pathname === 'undefined'
      ? null
      : url.pathname;
  }

  public set path(path: string | null) {
    const url = parse(this._req);
    if (!url || url.pathname === path) return;

    url.pathname = path;
        
    this.url = format(url)
  }

  get querystring(): string {
    if (!this._req) return '';
    return (parse(this._req)?.query as string) || ''
  }

  set querystring(str: string) {
    const url = parse(this._req);
    if (!url || url.search === `?${str}`) return;

    url.search = str;
    url.path = null;

    this.url = format(url);
  }

  get search(): string {
    if (!this.querystring) return '';
    return `?${this.querystring}`;
  }

  set search(str: string) {
    this.querystring = str;
  }
}