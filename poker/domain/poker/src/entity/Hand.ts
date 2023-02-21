import { Log } from '../../const/Log';
import { Card } from '../value_object/Card';
import { Role } from '../value_object/Role';

export class Hand {
  constructor(private hand: Card[]) {}

  get() {
    return this.hand.map((card) => card.value()).join(',');
  }

  invalidHand(): string[] {
    const errorMsg: string[] = [];
    //絵柄チェック + 数字チェク
    this.hand.map((card, i) => {
      if (!card.valid()) {
        //エラーの内容はここで付ける
        errorMsg.push(i + 1 + card.get());
      }
    });
    // 重複チェック
    const cardCount = new Set(this.hand.map((a) => a.value()));
    if (cardCount.size !== 5) {
      errorMsg.push(Log.Msg.DUPLICATION_CARD);
    }

    return errorMsg;
  }

  checkRole(): Role {
    //フラッシュかどうか確認
    const isFlush =
      this.hand.filter(
        (_, i) =>
          this.hand[i]?.get().split('')[0] !== this.hand[0]?.get().split('')[0],
      ).length === 0
        ? true
        : false;

    //一番小さい数字のカードを探す(ストレートチェックに使う)
    const checkSmallestCard = () => {
      let smallestCardTmp = 13;
      this.hand.map((_, i) => {
        const currentNumber = Number(this.hand[i].get().split('')[1]);
        if (currentNumber < smallestCardTmp) {
          smallestCardTmp = currentNumber;
        }
      });
      return smallestCardTmp;
    };

    //ストレートか確認する
    const isStraight = () => {
      for (let i = 0; i < 5; i++) {
        if (
          !this.hand.find(
            (card) =>
              checkSmallestCard() + i === Number(card.get().split('')[1]),
          )
        ) {
          return false;
        }
      }
      return true;
    };

    //ここで役の確認
    const checkPairCard = (): string => {
      const cardCount = new Array(5).fill(0);
      let result: string;
      this.hand.map((card, i) => {
        const currentNumber = Number(this.hand[i].get().split('')[1]);
        cardCount[currentNumber] += 1;
      });
      for (let i = 0; i < 4; i++) {
        if (cardCount.find((card) => card === i + 1)) {
          result = `${i + 1}`;
        }
      }
      //３枚ペアの場合フルハウスの可能性があるので検知
      if (isFullHouse()) {
        return 'フルハウス';
      } else {
        //フルハウス以外のものを検知
        switch (result) {
          case '1':
            const type = isFlush
              ? isStraight()
                ? 'ストレートフラッシュ'
                : 'フラッシュ'
              : isStraight()
              ? 'ストレート'
              : 'ノーペア';
            return type;
          case '2':
            if (isFlush) {
              return 'フラッシュ';
            } else {
              if (cardCount.filter((a) => a === 2).length === 2) {
                return 'ツーペア';
              }
              return 'ワンペア';
            }
          case '3':
            if (isFlush) {
              return 'フラッシュ';
            } else {
              return 'スリーカード';
            }
          case '4':
            return 'フォーカード';
          default:
            return 'ノーペア';
        }
      }
    };

    const isFullHouse = () => {
      const countTmp = new Array(5).fill(0);
      this.hand.map((card, i) => {
        const currentNumber = Number(this.hand[i].get().split('')[1]);
        countTmp[currentNumber] += 1;
      });
      if (countTmp.find((a) => a === 2 && countTmp.find((a) => a === 3))) {
        return true;
      }
      return false;
    };

    //役をこの変数に保管
    const yaku: string = checkPairCard();
    return new Role(yaku);
  }
}
