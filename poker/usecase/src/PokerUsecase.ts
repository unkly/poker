import { Hand } from '../../domain/poker/src/entity/Hand';
import { HandResult } from '../../domain/poker/src/entity/HandResult';
import { HandsResult } from '../../domain/poker/src/entity/HandsResult';
import { InvalidHandsResult } from '../../domain/poker/src/entity/InvalidHandsResult';
import { Role } from '../../domain/poker/src/value_object/Role';
import { RoleResults } from '../../domain/poker/src/entity/RoleResults';
import { ValidHandsResult } from '../../domain/poker/src/entity/ValidHandsResult';

export interface IPokerUseCase {
  exec(hands: Hand[]): HandsResult;
}

export class PokerUsecase implements IPokerUseCase {
  exec(hands: Hand[]) {
    const roles: Role[] = [];
    const invalidHandsResult: InvalidHandsResult[] = [];
    const validHandsResult: ValidHandsResult[] = [];
    hands.map((hand) => {
      // 無効な手札のチェック
      const invalidHandResult = hand.invalidHand();
      if (invalidHandResult.length !== 0) {
        //無効な手札のためerrorにpush
        invalidHandsResult.push(
          new InvalidHandsResult(hand, invalidHandResult),
        );
      } else {
        //ハンドごとのロール確認
        const handRole = hand.checkRole();
        roles.push(handRole);
        validHandsResult.push(new ValidHandsResult(hand, handRole));
      }
    });
    //一番強いカードの確認
    //TODO
    const strongestRole = new RoleResults(roles).findIsStrongest();
    //一番強い役を処理
    const handsResult: HandResult[] = [];
    validHandsResult.map((hand) => {
      if (hand.yaku.get() === strongestRole.get()) {
        handsResult.push(new HandResult(hand.hand, hand.yaku, true));
      } else {
        handsResult.push(new HandResult(hand.hand, hand.yaku, false));
      }
    });
    return new HandsResult(handsResult, invalidHandsResult);
  }
}

//returnで返す値を直接もっている変数はすべてテストケースを試す
