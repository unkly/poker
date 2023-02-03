import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: { hands: string[] }): { hands: string[] } {
    value?.hands?.map((hands) => {
      if (typeof hands !== 'string') {
        throw new BadRequestException('文字列のみを入力してください');
      }
      const handArray = hands?.split(',');
      if (handArray.length !== 5) {
        throw new BadRequestException(`カードを５枚入力してください`);
      }
    });
    return {
      hands: value.hands,
    };
  }
}
