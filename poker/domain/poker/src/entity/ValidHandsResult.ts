import { Hand } from './Hand';
import { Role } from '../value_object/Role';

export class ValidHandsResult {
  constructor(private _hand: Hand, private _yaku: Role) {}

  get hand(): Hand {
    return this._hand;
  }

  get yaku(): Role {
    return this._yaku;
  }
}
