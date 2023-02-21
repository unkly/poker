import { Injectable } from '@nestjs/common';
import { pokerHandsDTO } from './dto/request';
import { PokerControllerResultDTO } from './dto/response';
import { Card } from '../../../../domain/poker/src/value_object/Card';
import { PokerUsecase } from '../../../../usecase/src/PokerUsecase';
import { Hand } from '../../../../domain/poker/src/entity/Hand';

@Injectable()
export class PokerService {
  execute(params: pokerHandsDTO) {
    const paramsEntity = params.hands.map(
      (hand) => new Hand(hand.split(',').map((card) => new Card(card))),
    );
    //もともとcontroller.tsでインスタンス化していたが、エラー発生したので一時的にこちらでインスタンス化してます。
    const hands = new PokerUsecase().exec(paramsEntity);
    //型を変換してレスポンスに詰める
    const response: PokerControllerResultDTO = new PokerControllerResultDTO();
    response.result = hands.result.length
      ? new Array(hands.result.length).fill([])
      : undefined;
    response.error = hands.error.length
      ? new Array(hands.error.length).fill([])
      : undefined;

    hands.result.map((hand, i) => {
      response.result[i] = {
        hand: hand.hand.get().toString(),
        yaku: hand.yaku.get().toString(),
        isStrongest: hand.isStrongest,
      };
    });
    hands.error.map((hand, i) => {
      response.error[i] = {
        hand: hand.hand.get(),
        errorMessage: hand.errorMessage,
      };
    });
    return response;
  }
}
