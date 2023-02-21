import { Card } from '../../src/value_object/Card';

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

describe('正常系', () => {
  describe('正常なカードが入力されている', () => {
    NUM.forEach((num) => {
      ORE.forEach((ore) => {
        const card = ore + num;
        it('正常な値を返す', () => {
          expect(new Card(card).get()).toStrictEqual(card);
        });
      });
    });
  });
});
