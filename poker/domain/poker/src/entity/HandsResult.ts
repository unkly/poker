import { HandResult } from './HandResult';
import { InvalidHandsResult } from './InvalidHandsResult';

export class HandsResult {
  constructor(
    private _result?: HandResult[],
    private _error?: InvalidHandsResult[],
  ) {}

  get result() {
    return this._result;
  }
  get error() {
    return this._error;
  }
}
