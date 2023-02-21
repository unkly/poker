import { Hand } from './Hand';
import { Role } from '../value_object/Role';

export class HandResult {
  //TODO
  constructor(
    private _hand: Hand,
    private _yaku: Role,
    private _isStrongest: boolean,
  ) {}

  get hand(): Hand {
    return this._hand;
  }

  get yaku(): Role {
    return this._yaku;
  }

  get isStrongest(): boolean {
    return this._isStrongest;
  }
}
