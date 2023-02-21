import { Role } from '../../src/value_object/Role';

const type = [
  'ノーペア',
  'ワンペア',
  'ツーペア',
  'スリーカード',
  'フォーカード',
  'ストレート',
  'フルハウス',
  'フラッシュ',
  'ストレートフラッシュ',
];

describe('正常系', () => {
  describe('正常な役が返される', () => {
    type.forEach((ty) => {
      it('正常な役が返される', () => {
        expect(new Role(ty).get()).toEqual(ty);
      });
    });
  });
});
