import { Hand } from '../../src/entity/Hand';
import { Card } from '../../src/value_object/Card';

describe('正常系', () => {
  describe('正常な手札が入力されている', () => {
    const checkCardTypeArray = [
      'h1,h2,h3,h4,h5',
      'h1,s1,c1,d1,s2',
      'h1,s1,c1,h2,s2',
      'h1,h3,h4,h5,h6',
      'h1,h2,h3,h4,d5',
      'h1,s1,d1,s2,h3',
      'h1,s1,d3,s3,h5',
      'h1,s1,d3,d4,d5',
      'h1,h3,h4,h5,d7',
    ];
    checkCardTypeArray.forEach((hand) => {
      it('空の配列を返す', () => {
        expect(
          new Hand(hand.split(',').map((card) => new Card(card))).invalidHand(),
        ).toStrictEqual([]);
      });
    });
  });
  describe('ハンド内のカードの値が不正である', () => {
    const invalidCardTypeArray = [
      {
        name: '1h,2h,3h,4h,4h',
        msg: ['カードが重複しています'],
      }, //カードの重複
      {
        name: 'hh,cc,dd,ss,ff',
        msg: [
          '1番目のカードの数値が不正です',
          '2番目のカードの数値が不正です',
          '3番目のカードの数値が不正です',
          '4番目のカードの数値が不正です',
          '5番目のカードの数値が不正です',
        ],
      }, //数字がない
      {
        name: 'h12,h13,h14,h15,h16',
        msg: [
          '3番目のカードの数値が不正です',
          '4番目のカードの数値が不正です',
          '5番目のカードの数値が不正です',
        ],
      }, //数字が不正
      {
        name: 'f1,f2,f3,f4,f5',
        msg: [
          '1番目のカードの絵柄が不正です',
          '2番目のカードの絵柄が不正です',
          '3番目のカードの絵柄が不正です',
          '4番目のカードの絵柄が不正です',
          '5番目のカードの絵柄が不正です',
        ],
      }, //絵柄が不正
    ];
    invalidCardTypeArray.forEach((hand, i) => {
      it(`エラーメッセージの配列を返す${i}`, () => {
        expect(
          new Hand(
            hand.name.split(',').map((card) => new Card(card)),
          ).invalidHand(),
        ).toStrictEqual(hand.msg);
      });
    });
  });
});
