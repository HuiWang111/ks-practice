import type { OutgoingHttpHeaders, ServerResponse } from 'http'

export class Response {
  private _res: ServerResponse;

  constructor(res: ServerResponse) {
    this._res = res;
  }

  get headers(): OutgoingHttpHeaders {
    return this._res.getHeaders();
  }

  get status(): number {
    return this._res.statusCode;
  }

  set status(code: number) {
    this._res.statusCode = code;
  }

  get message(): string {
    return this._res.statusMessage;
  }

  set message(msg: string) {
    this._res.statusMessage = msg;
  }
}