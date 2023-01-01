export class CarWorldApiResponse {
  constructor(
    private _code?: number,
    private _message?: any,
    private _error?: string,
    private _data?: any,
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

  get message(): any {
    return this._message;
  }

  set message(message: any) {
    this._message = message;
  }

  get data(): string {
    return this._data;
  }

  set data(data: any) {
    this._data = data;
  }
}
