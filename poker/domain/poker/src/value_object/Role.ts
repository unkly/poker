import { Log } from '../../const/Log';

export class Role {
  constructor(protected readonly _value: string) {
    this._value = Object.freeze(_value);
  }

  get(): string {
    if (this.valid() === false) {
      return Log.Msg.INVALID_ROLE;
    }
    return this._value;
  }

  valid(): boolean {
    const type = [
      'ノーペア',
      'ワンペア',
      'ツーペア',
      'スリーカード',
      'フォーカード',
      'ストレート',
      'フルハウス',
      'フラッシュ',
      'ストレートフラッシュ',
    ];

    if (type.includes(this._value)) {
      return true;
    } else {
      return false;
    }
  }
}
