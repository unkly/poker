import { PokerUsecase } from '../src/PokerUsecase';
import { Hand } from '../../domain/poker/src/entity/Hand';
import { Card } from '../../domain/poker/src/value_object/Card';
import { HandsResult } from '../../domain/poker/src/entity/HandsResult';
import { InvalidHandsResult } from '../../domain/poker/src/entity/InvalidHandsResult';
import { HandResult } from '../../domain/poker/src/entity/HandResult';
import { Role } from '../../domain/poker/src/value_object/Role';

describe('正常系', () => {
  describe('無効な手札を一組だけ入れる', () => {
    it('resultがundefined、errorが一組だけ帰ってくる', () => {
      const hands = new Hand([
        new Card('h33'),
        new Card('h2'),
        new Card('h3'),
        new Card('h4'),
        new Card('h5'),
      ]);
      expect(new PokerUsecase().exec([hands])).toEqual(
        new HandsResult(
          [],
          [new InvalidHandsResult(hands, ['1番目のカードの数値が不正です'])],
        ),
      );
    });
  });
  describe('無効な手札を1組、有効な手札を1組入れる', () => {
    it('result,errorそれぞれに一つずつデータが入って帰ってくる', () => {
      const missingHand = new Hand([
        new Card('h33'),
        new Card('h2'),
        new Card('h3'),
        new Card('h4'),
        new Card('h5'),
      ]);
      const allowHand = new Hand([
        new Card('h1'),
        new Card('h2'),
        new Card('h3'),
        new Card('h4'),
        new Card('h5'),
      ]);
      expect(new PokerUsecase().exec([missingHand, allowHand])).toEqual(
        new HandsResult(
          [new HandResult(allowHand, allowHand.checkRole(), true)],
          [
            new InvalidHandsResult(missingHand, [
              '1番目のカードの数値が不正です',
            ]),
          ],
        ),
      );
    });
  });
});
