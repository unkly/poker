import { Log } from '../../const/Log';

const NUM = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
];
const ORE = ['h', 's', 'c', 'd'];

export class Card {
  constructor(protected readonly _value: string) {
    this._value = Object.freeze(_value);
  }

  value(): string {
    return this._value;
  }

  get(): string {
    if (this.valid() === false) {
      const cardNumber = this._value
        .split('')
        .filter((a) => NUM.includes(a))
        .join('');
      const cardType = this._value
        .split('')
        .filter((a) => ORE.includes(a))
        .join('');
      //数字チェック
      if (!NUM.includes(cardNumber)) {
        return Log.Msg.INVALID_CARD_NUMBER;
      }
      //絵柄チェック
      if (!ORE.includes(cardType)) {
        return Log.Msg.INVALID_CARD_TYPE;
      }
    } else {
      return this._value;
    }
  }

  valid(): boolean {
    //カードの数字チェック
    if (
      NUM.includes(
        this._value
          .split('')
          .filter((value) => NUM.includes(value))
          .join(''),
      )
    ) {
      //カードの絵柄のチェック
      if (
        ORE.includes(
          this._value
            .split('')
            .filter((value) => ORE.includes(value))
            .join(''),
        )
      ) {
        return true;
      }
    }
    return false;
  }
}
