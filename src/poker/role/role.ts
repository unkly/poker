import { allowedHandsResult } from 'src/types/allowedHandsResultTypes';

export class PokerRole {
  checkRole(cards: string[]): allowedHandsResult {
    //最終的にここに役を入れて返す

    //フラッシュかどうか確認
    const isFlush =
      cards.filter((_, i) => cards[i]?.split('')[0] !== cards[0]?.split('')[0])
        .length === 0
        ? true
        : false;

    //一番小さい数字のカードを探す(ストレートチェックに使う)
    const checkSmallestCard = () => {
      let smallestCardTmp = 13;
      cards.map((_, i) => {
        const currentNumber = Number(cards[i].split('')[1]);
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
          !cards.find(
            (card) => checkSmallestCard() + i === Number(card.split('')[1]),
          )
        ) {
          return false;
        }
      }
      return true;
    };

    //ここで役の確認
    const checkPairCard = () => {
      const cardCount = new Array(5).fill(0);
      let result: string;
      cards.map((card, i) => {
        const currentNumber = Number(cards[i].split('')[1]);
        cardCount[currentNumber] += 1;
      });
      for (let i = 0; i < 4; i++) {
        if (cardCount.find((card) => card === i + 1)) {
          result = `${i + 1}`;
        }
      }
      //３枚ペアの場合フルハウスの可能性があるので検知
      if (isFullHouse()) {
        return { name: 'フルハウス', level: 3 };
      } else {
        //フルハウス以外のものを検知
        switch (result) {
          case '1':
            const type = isFlush
              ? isStraight()
                ? { name: 'ストレートフラッシュ', level: 1 }
                : { name: 'フラッシュ', level: 4 }
              : isStraight()
              ? { name: 'ストレート', level: 5 }
              : { name: 'ノーペア', level: 9 };
            return type;
          case '2':
            if (isFlush) {
              return { name: 'フラッシュ', level: 4 };
            } else {
              if (cardCount.filter((a) => a === 2).length === 2) {
                return { name: 'ツーペア', level: 7 };
              }
              return { name: 'ワンペア', level: 8 };
            }
          case '3':
            if (isFlush) {
              return { name: 'フラッシュ', level: 4 };
            } else {
              return { name: 'スリーカード', level: 6 };
            }
          case '4':
            return { name: 'フォーカード', level: 2 };
          default:
            return { name: 'ノーペア', level: 9 };
        }
      }
    };

    const isFullHouse = () => {
      const countTmp = new Array(5).fill(0);
      cards.map((card, i) => {
        const currentNumber = Number(cards[i].split('')[1]);
        countTmp[currentNumber] += 1;
      });
      if (countTmp.find((a) => a === 2 && countTmp.find((a) => a === 3))) {
        return true;
      }
      return false;
    };

    //役をこの変数に保管
    const yaku: { name: string; level: number } = checkPairCard();

    return {
      hand: cards.join(','),
      yaku: yaku,
      isSrongest: false,
    };
  }

  checkStrongestHand(hands: allowedHandsResult[]) {
    const result = hands;
    //最初は一番弱い役を指定
    let currentStrongestYaku = 9;
    //yaku.levelが一番低いレベルを算出(要するに一番強い役)
    result.map((hand) => {
      if (hand.yaku?.level < currentStrongestYaku) {
        currentStrongestYaku = hand.yaku.level;
      }
    });
    //一番強い役のboolean値を変更
    result.map((hand) => {
      if (hand.yaku?.level === currentStrongestYaku) {
        hand.isSrongest = true;
      }
    });

    return result;
  }
}
