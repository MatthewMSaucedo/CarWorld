export class CarWorldApiResponse {
  constructor(
    private _code?: number,
    private _response?: any,
    private _error?: string,
  ) { }

  get code(): number {
    return this._code;
  }

  set code(code: number) {
    this._code = code;
  }

  get error(): string {
    return this._error;
  }

  set error(error: string) {
    this._error = error;
  }

  get response(): any {
    return this._response;
  }

  // TODO: Consider passing this a res obj type and letting this initialize that?
  set response(res: any) {
    this._response = res;
  }
}
