import { NUM } from 'src/cnt/NUM';
import { ORE } from 'src/cnt/ORE';
import { errorHandsResult } from 'src/types/errorHandsResultTypes';
import { invalidCardTypes } from 'src/types/InvalidCardTypes';

export class HandsValidation {
  //エラーメッセージを返す
  private handsErrorMessage(
    cards: { type: invalidCardTypes; index?: number }[],
    hands: string,
  ): errorHandsResult {
    const errorMsg: string[] = [];
    cards.map((card) => {
      switch (card.type) {
        case 'noErrors':
          break;
        case 'duplicateOfCard':
          errorMsg.push('カードが重複しています');
          break;
        case 'invalidCardNumber':
          errorMsg.push(`${card.index + 1}番目のカードの数値が不正です`);
          break;
        case 'invalidCardType':
          errorMsg.push(`${card.index + 1}番目のカードの種類が不正です`);
          break;
        case 'missingComma':
          errorMsg.push('カードの間をコンマで区切ってください');
          break;
      }
    });
    return {
      hand: hands,
      errorMessage: errorMsg,
    };
  }

  //ここではpipeで防げないエラーの対処をする
  handsErrorExeption(hands: string[]) {
    //エラーが出たハンドと出なかったハンドをそれぞれ分ける
    const result = [];
    const error: errorHandsResult[] = [];

    const checkInvalidCards = (
      cards: string,
    ): { type: invalidCardTypes; index?: number }[] => {
      const handArray = cards.split(',').map((a) => a.replace(' ', ''));
      const errorMsg: {
        type: invalidCardTypes;
        index?: number;
      }[] = [];
      const cardCount: string[] = [];
      handArray.map((hand, i) => {
        cardCount.push(hand);
        //柄チェック
        const ore = hand.split('').filter((a) => ORE.includes(a));
        if (ore.length !== 1) {
          errorMsg.push({ type: 'invalidCardType', index: i });
        }

        //数字チェック
        const num = Number(
          hand
            .split('')
            .filter((a) => NUM.includes(a))
            .join(''),
        );
        if (num > 13 || num === 0) {
          errorMsg.push({ type: 'invalidCardNumber', index: i });
        }
      });
      //重複カードチェック
      const cardTypeCount = new Set(cardCount);
      if (cardTypeCount.size !== 5) {
        errorMsg.push({ type: 'duplicateOfCard' });
      }
      return [...errorMsg];
    };

    hands?.map((cards) => {
      const invalidCards = checkInvalidCards(cards);
      if (invalidCards.length === 0) {
        result.push(cards);
      } else {
        console.log(invalidCards, cards);
        error.push(this.handsErrorMessage(invalidCards, cards));
      }
    });

    //エラーハンドがある場合のみerrorに入れて返す
    if (error[0]) {
      return {
        result: result,
        error: error,
      };
    }
    return { result: result };
  }
}
