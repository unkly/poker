import { Injectable } from '@nestjs/common';
import { allowedHandsResult } from 'src/types/allowedHandsResultTypes';
import { HandsValidation } from './error/error';
import { PokerRole } from './role/role';

@Injectable()
export class PokerService {
  start(params) {
    const hands: allowedHandsResult[] = [];
    //カードチェック
    const handsAfterCardChecked = new HandsValidation().handsErrorExeption(
      params.hands,
    );
    //役チェック
    handsAfterCardChecked.result.map((arr) => {
      hands.push(new PokerRole().checkRole(String(arr).split(',')));
    });
    //一番強い役を判定
    const resultOfStrongestCards = new PokerRole().checkStrongestHand(hands);
    if (handsAfterCardChecked.error?.length !== 0) {
      return {
        result: resultOfStrongestCards,
        error: handsAfterCardChecked.error,
      };
    } else {
      return {
        result: resultOfStrongestCards,
      };
    }
  }
}
