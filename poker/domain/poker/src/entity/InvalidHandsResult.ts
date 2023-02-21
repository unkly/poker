import { Hand } from './Hand';

export class InvalidHandsResult {
  constructor(private _hand: Hand, private _errorMessage: string[]) {}

  get hand(): Hand {
    return this._hand;
  }

  get errorMessage(): string[] {
    return this._errorMessage;
  }
}
