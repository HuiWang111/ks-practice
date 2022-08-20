import type { IncomingMessage, ServerResponse } from 'http';
import type { Response } from './response';
import type { Request } from './request';

export class Context {
  private _request: Request;
  private _response: Response;
  private _req: IncomingMessage;
  private _res: ServerResponse;

  constructor(
    request: Request,
    response: Response,
    req: IncomingMessage,
    res: ServerResponse
  ) {
    this._request = request;
    this._response = response;
    this._req = req;
    this._res = res;
  }

  get request(): Request {
    return this._request;
  }

  get response(): Response {
    return this._response;
  }

  get req(): IncomingMessage {
    return this._req;
  }

  get res(): ServerResponse {
    return this._res;
  }

  set body(body: any) {
    this._res.end(body);
  }
}